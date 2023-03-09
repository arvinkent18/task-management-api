import mongoose from 'mongoose';
import { TaskStatus } from './task-status.enum';

export interface Task {
  userId?: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  status: TaskStatus;
}
