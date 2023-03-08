import { TestingModule } from '@nestjs/testing';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

export const closeDatabaseConnection = async (moduleFixture: TestingModule) => {
  const connection = moduleFixture.get<Connection>(getConnectionToken());
  await connection.close();
};

export const clearDatabase = async (moduleFixture: TestingModule) => {
  const connection = moduleFixture.get<Connection>(getConnectionToken());
  const collections = connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
