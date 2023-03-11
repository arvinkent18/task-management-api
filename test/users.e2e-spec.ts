import { QueryResponse } from './../src/common/interfaces/query-response.interface';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { clearDatabase, closeDatabaseConnection } from './test-utils';
import { mockUser } from '../src/users/mocks/user-data.mock';
import { GetUserDto } from 'users/dto/get-user.dto';

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

  describe('createUser', () => {
    it('should able to create user', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(mockUser)
        .expect(HttpStatus.CREATED);

      const { statusCode, data }: QueryResponse = response.body;
      delete data.password;
      delete mockUser.password;
      expect(statusCode).toEqual(HttpStatus.CREATED);
      expect(data).toEqual({ ...mockUser, id: data.id });
    });

    it('should throw an "UNPROCESSABLE_ENTITY" exception for existing user', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send(mockUser)
        .expect(HttpStatus.UNPROCESSABLE_ENTITY);
    });
  });

  describe('findUser', () => {
    it('should return a user when found', async () => {
      const getUserDto: GetUserDto = {
        username: 'admin',
      };
      const response = await request(app.getHttpServer())
        .get(`/users/find?username=${getUserDto.username}`)
        .send({...getUserDto})
        .expect(HttpStatus.OK);

      const { statusCode, data }: QueryResponse = response.body;
      delete data.password;
      delete mockUser.password;
      expect(statusCode).toEqual(HttpStatus.OK);
      expect(data).toEqual({ ...mockUser, id: data.id });
    });

    it('should return a null when user is not found', async () => {
      const getUserDto: GetUserDto = {
        username: 'unknown',
      };
      const response = await request(app.getHttpServer())
        .get(`/users/find?username=${getUserDto.username}`)
        .send({...getUserDto})
        .expect(HttpStatus.OK);

      const { statusCode, data }: QueryResponse = response.body;
      expect(statusCode).toEqual(HttpStatus.OK);
      expect(data).toBeNull()
    });
  });
});
