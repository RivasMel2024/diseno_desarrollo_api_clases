import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

type CachedEntry = {
  expiresAt: number;
  value: string;
};

@Injectable()
export class CacheService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(CacheService.name);
  private readonly client: RedisClientType;
  private readonly memoryCache = new Map<string, CachedEntry>();
  private readonly memoryCounters = new Map<string, number>();
  private isRedisReady = false;

  public constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL ?? 'redis://localhost:6379',
    });

    this.client.on('error', (error) => {
      this.isRedisReady = false;
      this.logger.warn(`Redis error: ${error.message}`);
    });
  }

  public async onModuleInit(): Promise<void> {
    try {
      await this.client.connect();
      this.isRedisReady = true;
      this.logger.log('Redis cache connected');
    } catch {
      this.isRedisReady = false;
      this.logger.warn('Redis unavailable, using the local fallback cache');
    }
  }

  public async onModuleDestroy(): Promise<void> {
    if (this.client.isOpen) {
      await this.client.quit();
    }
  }

  public async get<T>(key: string): Promise<T | null> {
    if (this.isRedisReady) {
      try {
        const rawValue = await this.client.get(key);
        if (rawValue) {
          return JSON.parse(rawValue) as T;
        }
      } catch (error) {
        this.logger.warn(`Redis read failed: ${(error as Error).message}`);
      }
    }

    const cachedEntry = this.memoryCache.get(key);
    if (!cachedEntry) {
      return null;
    }

    if (cachedEntry.expiresAt <= Date.now()) {
      this.memoryCache.delete(key);
      return null;
    }

    return JSON.parse(cachedEntry.value) as T;
  }

  public async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    const serializedValue = JSON.stringify(value);
    const expiresAt = Date.now() + ttlSeconds * 1000;

    this.memoryCache.set(key, {
      expiresAt,
      value: serializedValue,
    });

    if (!this.isRedisReady) {
      return;
    }

    try {
      await this.client.set(key, serializedValue, {
        EX: ttlSeconds,
      });
    } catch (error) {
      this.logger.warn(`Redis write failed: ${(error as Error).message}`);
    }
  }

  public async del(key: string): Promise<void> {
    this.memoryCache.delete(key);

    if (!this.isRedisReady) {
      return;
    }

    try {
      await this.client.del(key);
    } catch (error) {
      this.logger.warn(`Redis delete failed: ${(error as Error).message}`);
    }
  }

  public async increment(key: string): Promise<number> {
    const nextValue = (this.memoryCounters.get(key) ?? 0) + 1;
    this.memoryCounters.set(key, nextValue);

    if (!this.isRedisReady) {
      return nextValue;
    }

    try {
      return await this.client.incr(key);
    } catch (error) {
      this.logger.warn(`Redis incr failed: ${(error as Error).message}`);
      return nextValue;
    }
  }

  public async getCounter(key: string): Promise<number> {
    if (this.isRedisReady) {
      try {
        const rawValue = await this.client.get(key);
        if (rawValue !== null) {
          return Number(rawValue);
        }
      } catch (error) {
        this.logger.warn(`Redis read failed: ${(error as Error).message}`);
      }
    }

    return this.memoryCounters.get(key) ?? 0;
  }
}