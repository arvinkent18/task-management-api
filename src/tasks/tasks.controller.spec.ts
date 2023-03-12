import { ERR_UNPROCESSABLE_ENTITY } from './../constants';
import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { getModelToken } from '@nestjs/mongoose';
import { mockTask, mockTaskModel } from './mocks/tasks.mock';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { UnprocessableEntityException } from '@nestjs/common';
import { mockUser } from '../users/mocks/user-data.mock';

describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        {
          provide: getModelToken('Task'),
          useValue: mockTaskModel,
        },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    tasksController = module.get<TasksController>(TasksController);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(tasksController).toBeDefined();
  });

  describe('createTask', () => {
    it('should create a new task and return it', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test task',
        description: 'Test description',
        status: TaskStatus.Open,
      };

      jest.spyOn(tasksService, 'createTask').mockResolvedValue(mockTask);

      const result = await tasksController.createTask(mockUser, createTaskDto);

      expect(result).toEqual(mockTask);
      expect(tasksService.createTask).toHaveBeenCalledWith(
        mockUser,
        createTaskDto,
      );
    });

    it('should throw UnprocessableEntityException if tasks already exists', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test task',
        description: 'Test description',
        status: TaskStatus.Open,
      };

      jest
        .spyOn(tasksService, 'createTask')
        .mockRejectedValue(new UnprocessableEntityException(ERR_UNPROCESSABLE_ENTITY));

      await expect(
        tasksController.createTask(mockUser, createTaskDto),
      ).rejects.toThrow(UnprocessableEntityException);
      expect(tasksService.createTask).toHaveBeenCalledWith(
        mockUser,
        createTaskDto,
      );
    });
  });
});
