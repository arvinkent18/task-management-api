import { TaskStatus } from '../task-status.enum';
import { Task } from '../task.interface';

export const mockTask: Task = {
  title: 'Test task',
  description: 'Test description',
  status: TaskStatus.Open,
};

export const mockTaskModel = {
  create: jest.fn().mockResolvedValueOnce(mockTask),
  findOne: jest.fn().mockReturnThis(),
  exec: jest.fn().mockResolvedValueOnce(mockTask),
  save: jest.fn().mockResolvedValueOnce(mockTask),
};

jest.spyOn(mockTaskModel, 'findOne').mockReturnValueOnce({
  select: jest.fn().mockReturnThis(),
  exec: jest.fn().mockResolvedValueOnce(null),
});