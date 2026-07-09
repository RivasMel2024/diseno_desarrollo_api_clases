import { Injectable } from '@nestjs/common';
import { CacheService } from '../cache/cache.service';

type DashboardMetrics = {
  activeUsers: number;
  conversionRate: number;
  totalSales: number;
};

type DashboardReport = {
  generatedAt: string;
  metrics: DashboardMetrics;
  userId: string;
};

export type DashboardResponse = DashboardReport & {
  cached: boolean;
  source: 'database' | 'redis';
};

export type DashboardStats = {
  hits: number;
  misses: number;
};

const ADMIN_TTL_SECONDS = 10;
const REGULAR_TTL_SECONDS = 60;
const CACHE_HITS_KEY = 'dashboard_stats_hits';
const CACHE_MISSES_KEY = 'dashboard_stats_misses';

@Injectable()
export class DashboardService {
  public constructor(private readonly cacheService: CacheService) {}

  public async getDashboard(userId: string, role?: string): Promise<DashboardResponse> {
    console.time(`GET /dashboard/${userId}`);

    const cacheKey = this.buildCacheKey(userId);
    const cachedReport = await this.cacheService.get<DashboardReport>(cacheKey);

    if (cachedReport) {
      await this.cacheService.increment(CACHE_HITS_KEY);
      console.timeEnd(`GET /dashboard/${userId}`);

      return {
        ...cachedReport,
        cached: true,
        source: 'redis',
      };
    }

    await this.cacheService.increment(CACHE_MISSES_KEY);

    const report = await this.generateReport(userId);
    const ttlSeconds = role === 'admin' ? ADMIN_TTL_SECONDS : REGULAR_TTL_SECONDS;

    await this.cacheService.set(cacheKey, report, ttlSeconds);

    console.timeEnd(`GET /dashboard/${userId}`);

    return {
      ...report,
      cached: false,
      source: 'database',
    };
  }

  public async invalidate(userId: string): Promise<void> {
    await this.cacheService.del(this.buildCacheKey(userId));
  }

  public async getStats(): Promise<DashboardStats> {
    const [hits, misses] = await Promise.all([
      this.cacheService.getCounter(CACHE_HITS_KEY),
      this.cacheService.getCounter(CACHE_MISSES_KEY),
    ]);

    return { hits, misses };
  }

  private buildCacheKey(userId: string): string {
    return `dashboard_user_${userId}`;
  }

  private async generateReport(userId: string): Promise<DashboardReport> {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    return {
      generatedAt: new Date().toISOString(),
      metrics: {
        activeUsers: Math.round(Math.random() * 500),
        conversionRate: Number((Math.random() * 10).toFixed(2)),
        totalSales: Math.round(Math.random() * 10000),
      },
      userId,
    };
  }
}
