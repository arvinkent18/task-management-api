import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DB_TASK_MODEL } from '../src/constants';
import { TaskDocument } from '../src/tasks/task.schema';
import { TestingModule } from '@nestjs/testing';

export const clearDatabase = async (
  moduleFixture: TestingModule,
): Promise<void> => {
  const taskModel = moduleFixture.get<Model<TaskDocument>>(
    getModelToken(DB_TASK_MODEL),
  );
  await taskModel.deleteMany({});
};
