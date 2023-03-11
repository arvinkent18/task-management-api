import { DB_TASK_MODEL, ERR_UNPROCESSABLE_ENTITY } from './../constants';
import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDocument } from './task.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './task.interface';
import { User } from '../users/user.interface';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(DB_TASK_MODEL) private readonly taskModel: Model<TaskDocument>,
  ) {}

  /**
   * Creates a new task for the specified user.
   *
   * @param {User} user - The user who will own the new task.
   * @param {CreateTaskDto} createTaskDto - The data required to create the new task.
   * @throws {UnprocessableEntityException} If a task with the same title already exists.
   * @throws {InternalServerErrorException} If an unexpected error occurs while creating the new task.
   * @returns {Promise<Task>} The newly created Task object.
   */
  async createTask(user: User, createTaskDto: CreateTaskDto): Promise<Task> {
    const { title } = createTaskDto;

    if (await this.checkIfTaskExists(title)) {
      throw new UnprocessableEntityException(ERR_UNPROCESSABLE_ENTITY);
    }

    try {
      const createdTask = this.taskModel.create({
        ...createTaskDto,
        userId: user.id,
      });

      return createdTask;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  /**
   * Checks if a task with the specified title already exists.
   *
   * @param {string} title - The title of the task to check.
   * @returns {Promise<Task>} A promise that resolves to the existing task, or `null` if it doesn't exist.
   */
  async checkIfTaskExists(title: string): Promise<Task | null> {
    const task = await this.taskModel.findOne({ title }).exec();

    if (!task) {
      return null;
    }

    return task;
  }
}
