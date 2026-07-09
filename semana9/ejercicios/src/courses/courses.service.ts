import { Injectable } from '@nestjs/common';
import { CacheService } from '../cache/cache.service';

type Course = {
  description: string;
  durationHours: number;
  id: number;
  teacher: string;
  title: string;
};

type CoursesPayload = {
  courses: Course[];
};

export type CoursesResponse = CoursesPayload & {
  cached: boolean;
  source: 'database' | 'redis';
};

const COURSES_CACHE_KEY = 'courses_all';
const COURSES_CACHE_TTL_SECONDS = 15;

@Injectable()
export class CoursesService {
  private readonly courses: Course[] = [
    {
      description: 'Introducción a módulos, controladores y servicios',
      durationHours: 8,
      id: 1,
      teacher: 'Ana',
      title: 'NestJS Fundamentals',
    },
    {
      description: 'Diseño de endpoints, validación y documentación',
      durationHours: 6,
      id: 2,
      teacher: 'Luis',
      title: 'REST APIs con Nest',
    },
    {
      description: 'Patrones de caché, TTL y reducción de latencia',
      durationHours: 5,
      id: 3,
      teacher: 'Marta',
      title: 'Caching en aplicaciones Node',
    },
  ];

  public constructor(private readonly cacheService: CacheService) {}

  public async findAll(): Promise<CoursesResponse> {
    console.time('GET /courses');

    const cachedCourses = await this.cacheService.get<CoursesPayload>(COURSES_CACHE_KEY);
    if (cachedCourses) {
      console.timeEnd('GET /courses');

      return {
        cached: true,
        courses: cachedCourses.courses,
        source: 'redis',
      };
    }

    const payload = await this.loadCoursesFromDatabase();

    await this.cacheService.set(COURSES_CACHE_KEY, payload, COURSES_CACHE_TTL_SECONDS);

    console.timeEnd('GET /courses');

    return {
      cached: false,
      courses: payload.courses,
      source: 'database',
    };
  }

  private async loadCoursesFromDatabase(): Promise<CoursesPayload> {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    return {
      courses: this.courses,
    };
  }
}