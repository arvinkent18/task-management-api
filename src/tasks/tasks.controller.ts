import { Body, Controller, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.interface';
import { TasksService } from './tasks.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '../users/user.interface';
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
    return this.tasksService.createTask(user, createTaskDto);
  }
}
