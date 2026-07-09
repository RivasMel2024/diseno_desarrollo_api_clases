import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { CoursesService } from '../src/courses/courses.service';

describe('CoursesController (e2e)', () => {
  it('returns the courses payload', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CoursesService)
      .useValue({
        findAll: jest.fn().mockResolvedValue({
          cached: true,
          courses: [
            {
              description: 'Mock course',
              durationHours: 1,
              id: 1,
              teacher: 'Test',
              title: 'Testing Nest endpoints',
            },
          ],
          source: 'redis',
        }),
      })
      .compile();

    const app = moduleRef.createNestApplication();
    await app.init();

    await request(app.getHttpServer())
      .get('/courses')
      .expect(200)
      .expect({
        cached: true,
        courses: [
          {
            description: 'Mock course',
            durationHours: 1,
            id: 1,
            teacher: 'Test',
            title: 'Testing Nest endpoints',
          },
        ],
        source: 'redis',
      });

    await app.close();
  });
});