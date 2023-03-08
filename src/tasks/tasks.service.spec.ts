import { mockTask, mockTaskModel } from './mocks/tasks.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { DB_TASK_MODEL, ERR_UNPROCESSABLE_ENTITY } from '../constants';
import { Model } from 'mongoose';
import { TaskDocument } from './task.schema';
import { UnprocessableEntityException } from '@nestjs/common';

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
    const createTaskDto: CreateTaskDto = {
      title: 'Test task',
      description: 'Test description',
      status: TaskStatus.OPEN,
    };
    mockTaskModel.findOne.mockReturnValueOnce(null);
    const result = await tasksService.createTask(createTaskDto);
  
    expect(result).toEqual(mockTask);
    expect(mockTaskModel.create).toHaveBeenCalledWith(createTaskDto);
    expect(mockTaskModel.findOne).toHaveBeenCalledWith({ title: createTaskDto.title });
  });

  it('should throw UnprocessableEntityException if tasks already exists', async () => {
    const existingTask = { ...mockTask };
    jest
      .spyOn(tasksService, 'checkIfTaskExists')
      .mockResolvedValueOnce(existingTask);

    const createTaskDto: CreateTaskDto = {
      title: 'Test task',
      description: 'Test description',
      status: TaskStatus.OPEN,
    };

    await expect(tasksService.createTask(createTaskDto)).rejects.toThrow(
      new UnprocessableEntityException(ERR_UNPROCESSABLE_ENTITY),
    );
  });
});
