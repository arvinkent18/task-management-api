import { DB_TASK_MODEL, ERR_UNPROCESSABLE_ENTITY } from './../constants';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
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

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title } = createTaskDto;

    if (await this.checkIfTaskExists(title)) {
      throw new UnprocessableEntityException(ERR_UNPROCESSABLE_ENTITY);
    }

    const createdTask = this.taskModel.create(createTaskDto);

    return createdTask;
  }

  async checkIfTaskExists(title: string): Promise<Task> {
    const task = await this.taskModel.findOne({ title }).exec();

    return task;
  }
}
