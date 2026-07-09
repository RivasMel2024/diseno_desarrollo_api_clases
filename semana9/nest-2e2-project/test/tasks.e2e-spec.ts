import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('TasksController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/tasks (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/tasks')
      .send({ title: 'Test E2E', description: 'End-to-end' })
      .expect(201);

    expect(response.body.title).toBe('Test E2E');
    expect(response.body).toHaveProperty('id');
  });

  it('/tasks (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/tasks')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].title).toBe('Test E2E');
  });

  afterAll(async () => {
    await app.close();
  });
});