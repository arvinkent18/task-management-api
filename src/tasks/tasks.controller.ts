import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.interface';
import { TasksService } from './tasks.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '../users/user.interface';
import { GetTaskDto } from './dto/get-task.dto';
@ApiBearerAuth()
@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * Creates a new task for the specified user.
   *
   * @param {User} user - The user who will own the new task.
   * @param {CreateTaskDto} createTaskDto - The data required to create the new task.
   * @throws {UnprocessableEntityException} If a task with the same title already exists.
   * @throws {InternalServerErrorException} If an unexpected error occurs while creating the new task.
   * @returns {Promise<Task>} The newly created Task object.
   */
  @ApiCreatedResponse({
    description: 'The task has been successfully created.',
  })
  @ApiUnprocessableEntityResponse({
    description: 'A task with the same title already exists.',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected error occurred while creating the task.',
  })
  @ApiBody({
    type: CreateTaskDto,
  })
  @Post()
  async createTask(
    @GetUser() user: User,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    try {
      const task = this.tasksService.createTask(user, createTaskDto);

      return task;
    } catch (error) {
      if (error instanceof UnprocessableEntityException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Checks if a task with the specified title already exists.
   *
   * @param {User} user - The user who will own the new task.
   * @param {GetTaskDto} getTaskDto - The data required to find.
   * @throws {InternalServerErrorException} If an unexpected error occurs while creating the new task.
   * @returns {Promise<Task | null>} A promise that resolves to the existing task, or `null` if it doesn't exist.
   */
  @ApiOkResponse({
    description: 'The task has been successfully fetched.',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected error occurred while fetching the task.',
  })
  @Get()
  async findTask(
    @GetUser() user: User,
    @Query() getTaskDto: GetTaskDto,
  ): Promise<Task | null> {
    try {
      const task = this.tasksService.findTask(getTaskDto);

      return task;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
