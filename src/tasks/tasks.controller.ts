import { ReadTaskHandler } from '../authorization/handlers/task/read-task.handler';
import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
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
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from '../users/user.interface';
import { GetTaskDto } from './dto/get-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { CheckPolicies } from '../authorization/policy.decorator';
import { DeleteTaskHandler } from '../authorization/handlers/task/delete-task.handler';
import { UpdateTaskHandler } from '../authorization/handlers/task/update-task.handler';

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
   * Fetch all the tasks
   *
   * @param {GetTasksDto} getTasksDto - The data required for pagination.
   * @throws {InternalServerErrorException} If an unexpected error occurs while creating the new task.
   * @returns {Promise<Task[]>} The list of tasks
   */
  @Get()
  async getTasks(@Query() getTasksDto: GetTasksDto): Promise<Task[]> {
    try {
      const tasks = this.tasksService.getTasks(getTasksDto);

      return tasks;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  /**
   * Find a task by Title.
   *
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
  @Get('/search')
  async getTaskByTitle(@Query() getTaskDto: GetTaskDto): Promise<Task | null> {
    try {
      const task = this.tasksService.getTaskByTitle(getTaskDto);

      return task;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  /**
   * Find a task by ID.
   *
   * @param {User} user - The user who will own the new task.
   * @param {GetTaskDto} getTaskDto - The data required to find.
   * @throws {NotFoundException} If the task is not found.
   * @throws {InternalServerErrorException} If an unexpected error occurs while creating the new task.
   * @returns {Promise<Task>} A promise that resolves to the existing task, or `null` if it doesn't exist.
   */
  @ApiOkResponse({
    description: 'The task has been successfully fetched.',
  })
  @ApiInternalServerErrorResponse({
    description: 'An unexpected error occurred while fetching the task.',
  })
  @CheckPolicies(ReadTaskHandler)
  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    try {
      const task = this.tasksService.getTaskById(id);

      return task;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }

  /**
   * Updates a task by ID
   *
   * @param {string} id - The ID of the task to update
   * @param {UpdateTaskDto} updateTaskDto - The updated task data
   * @throws {NotFoundException} If the task is not existing.
   * @throws {InternalServerErrorException} If an unexpected error occurs while updating the task.
   * @returns {Promise<Task>} The updated task
   */
  @Put(':id')
  @CheckPolicies(UpdateTaskHandler)
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    try {
      const task = this.tasksService.updateTask(id, updateTaskDto);

      return task;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Deletes a task by ID
   *
   * @param {string} id - The ID of the task to delete
   * @throws {NotFoundException} If the task is not existing.
   * @throws {InternalServerErrorException} If an unexpected error occurs while deleting the task.
   * @returns {Promise<void>}
   */
  @Delete(':id')
  @CheckPolicies(DeleteTaskHandler)
  @ApiParam({ name: 'id' })
  async remove(@Param('id') id: string): Promise<void> {
    try {
      this.tasksService.deleteTask(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
