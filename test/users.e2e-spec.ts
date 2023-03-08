import { mockUser } from '../src/users/mocks/users.mock';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { clearDatabase, closeDatabaseConnection } from './test-utils';

describe('Users (e2e)', () => {
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

  it('should able to create user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(mockUser)
      .expect(201);

    expect(response.body.username).toEqual(mockUser.username);
  });

  it('should throw an error for existing user', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send(mockUser)
      .expect(HttpStatus.UNPROCESSABLE_ENTITY);
  });
});
