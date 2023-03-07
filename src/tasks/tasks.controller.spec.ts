import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { getModelToken } from '@nestjs/mongoose';
import { mockTask, mockTaskModel } from './mocks/task.mock';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.interface';

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

  it('should be defined', () => {
    expect(tasksController).toBeDefined();
  });

  it('should return the newly created task', async () => {
    const createTask: CreateTaskDto = {
      title: 'Test task',
      description: 'Test description',
      status: TaskStatus.OPEN,
    };

    jest.spyOn(tasksService, 'create').mockResolvedValue(createTask);

    const result: Task = await tasksController.create(createTask);
    expect(result).toEqual({ ...mockTask })
  });
});
