import { TaskStatus } from './task-status.enum';

export interface Task {
  _id?: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
