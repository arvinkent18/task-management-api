import { mockTask, mockTaskModel } from './mocks/tasks.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { DB_TASK_MODEL } from '../constants';
import { Model } from 'mongoose';
import { TaskDocument } from './task.schema';

describe('TasksService', () => {
  let tasksService: TasksService;
  let taskModel: Model<TaskDocument>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(DB_TASK_MODEL),
          useValue: mockTaskModel,
        },
      ],
    }).compile();

    tasksService = moduleRef.get<TasksService>(TasksService);
    taskModel = moduleRef.get<Model<TaskDocument>>(
      getModelToken(DB_TASK_MODEL),
    );
  });

  it('should be defined', () => {
    expect(tasksService).toBeDefined();
  });

  it('should create a new task', async () => {
    jest
      .spyOn(taskModel, 'create')
      .mockImplementationOnce(() => Promise.resolve(mockTask));
    const createTask: CreateTaskDto = {
      title: 'Test task',
      description: 'Test description',
      status: TaskStatus.OPEN,
    };
    expect(createTask).toEqual(mockTask);
  });
});
