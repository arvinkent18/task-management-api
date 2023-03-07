import { TaskStatus } from './task-status.enum';

export interface Task {
  title: string;
  description: string;
  status: TaskStatus;
}
