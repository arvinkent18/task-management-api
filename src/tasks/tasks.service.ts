import { DB_TASK_MODEL, ERR_UNPROCESSABLE_ENTITY } from './../constants';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDocument } from './task.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './task.interface';
import { User } from '../users/user.interface';
import { GetTaskDto } from './dto/get-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

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
   * @returns {Promise<Task>} The newly created Task object.
   */
  async createTask(user: User, createTaskDto: CreateTaskDto): Promise<Task> {
    const { title } = createTaskDto;
    const isTaskExist = await this.findTask({ title });

    if (isTaskExist) {
      throw new UnprocessableEntityException(ERR_UNPROCESSABLE_ENTITY);
    }

    return this.taskModel.create({
      ...createTaskDto,
      userId: user.id,
    });
  }

  /**
   * Checks if a task with the specified title already exists.
   *
   * @param {GetTaskDto} getTaskDto - The data required to find.
   * @returns {Promise<Task | null>} A promise that resolves to the existing task, or `null` if it doesn't exist.
   */
  async findTask(getTaskDto: GetTaskDto): Promise<Task | null> {
    const { title } = getTaskDto;
    const task: Task | null = await this.taskModel.findOne({ title });

    if (!task) {
      return null;
    }

    return task;
  }

  /**
   * Updates a task by ID
   *
   * @param {string} id - The ID of the task to update
   * @param {UpdateTaskDto} updateTaskDto - The updated task data
   * @throws {NotFoundException} If no task is found with the given ID
   * @returns {Promise<Task>} The updated task
   */
  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const filter = { _id: id };
    const options = { new: true };
    const task = await this.taskModel.findOneAndUpdate(filter, updateTaskDto, options);

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  /**
   * Deletes a task by ID
   *
   * @param {string} id - The ID of the task to delete
   * @throws {NotFoundException} If no task is found with the given ID
   * @returns {Promise<void>}
   */
  async deleteTask(id: string): Promise<void> {
    const filter = { _id: id };
    await this.taskModel.findOneAndDelete(filter);
  }
}
