import { TaskStatus } from '../task-status.enum';
import { Task } from '../task.interface';

export const mockTask: Partial<Task> = {
  title: 'Test task',
  description: 'Test description',
  status: TaskStatus.OPEN,
};
