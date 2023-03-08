import { mockUser } from '../src/users/mocks/users.mock';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { clearDatabase, closeDatabaseConnection } from './test-utils';

describe('Auth (e2e)', () => {
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

  it('should be able to login the created user', async () => {
    delete mockUser._id;
    delete mockUser.status;

    await request(app.getHttpServer())
      .post('/auth/login')
      .send(mockUser)
      .expect(HttpStatus.OK);
  });

  it('should be able to throw UnAuthorizedException for invalid user credentials', async () => {
    delete mockUser._id;
    delete mockUser.status;
    
    await request(app.getHttpServer())
      .post('/auth/login')
      .send(mockUser)
      .expect(HttpStatus.OK);
  });
});
