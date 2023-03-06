import { DB_TASK_MODEL } from '../constants';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDocument } from './task.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './task.interface';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(DB_TASK_MODEL) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return new this.taskModel(createTaskDto).save();
  }
}
