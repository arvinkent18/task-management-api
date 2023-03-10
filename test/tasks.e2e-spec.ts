import { mockTask } from '../src/tasks/mocks/tasks.mock';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { clearDatabase, closeDatabaseConnection } from './test-utils';

describe('Tasks (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await clearDatabase(moduleFixture);
  });

  afterAll(async () => {
    await closeDatabaseConnection(moduleFixture);
    await app.close();
  });

  it('should create a task', async () => {
    const response = await request(app.getHttpServer())
      .post('/tasks')
      .send(mockTask)
      .expect(201);

    expect(response.body.title).toEqual(mockTask.title);
    expect(response.body.description).toEqual(mockTask.description);
  });

  it('should throw an error for existing task', async () => {
    await request(app.getHttpServer())
      .post('/tasks')
      .send(mockTask)
      .expect(HttpStatus.UNPROCESSABLE_ENTITY);
  });
});
