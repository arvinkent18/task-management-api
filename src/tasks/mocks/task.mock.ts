import { TaskStatus } from '../task-status.enum';
import { Task } from '../task.interface';

export const mockTask: Task = {
  title: 'Test task',
  description: 'Test description',
  status: TaskStatus.OPEN,
};

export const mockTaskModel = {
  new: jest.fn().mockResolvedValue(mockTask),
  constructor: jest.fn().mockResolvedValue(mockTask),
  find: jest.fn(),
  create: jest.fn(),
  exec: jest.fn(),
};
