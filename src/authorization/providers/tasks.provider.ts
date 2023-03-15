import { Request } from 'express';
import { TasksService } from '../../tasks/tasks.service';
import { Provider } from '@nestjs/common';
import { ReadTaskHandler } from '../handlers/task/read-task.handler';
import { REQUEST } from '@nestjs/core';
import { TaskDocument } from '../../tasks/task.schema';
import { DeleteTaskHandler } from '../handlers/task/delete-task.handler';
import { UpdateTaskHandler } from '../handlers/task/update-task.handler';

/**
 * Retrieves a task by ID from the task service
 *
 * @param {TasksService} tasksService - The TasksService instance to use for retrieving the task
 * @param {Request} request - The Express Request object containing the ID parameter for the task
 * @returns {Promise<TaskDocument>} a Promise that resolves to a TaskDocument representing the task with the specified ID
 */
async function getTask(
  tasksService: TasksService,
  request: Request,
): Promise<TaskDocument> {
  const { id } = request.params;
  const task = await tasksService.getTaskById(id);

  return task;
}

/**
 * A provider for the ReadTaskHandler class that retrieves the task specified in the request and instantiates a ReadTaskHandler with it
 *
 * @returns a Provider object that can be used in a NestJS module to provide instances of ReadTaskHandler
 */
const readTaskProvider: Provider = {
  provide: ReadTaskHandler,
  inject: [TasksService, REQUEST],
  useFactory: async (tasksService: TasksService, request: Request) => {
    return new ReadTaskHandler(await getTask(tasksService, request));
  },
};

/**
 * A provider for the UpdateTaskHandler class that retrieves the task specified in the request and instantiates a UpdateTaskHandler with it
 *
 * @returns a Provider object that can be used in a NestJS module to provide instances of UpdateTaskHandler
 */
const updateTaskProvider: Provider = {
  provide: UpdateTaskHandler,
  inject: [TasksService, REQUEST],
  useFactory: async (tasksService: TasksService, request: Request) => {
    return new ReadTaskHandler(await getTask(tasksService, request));
  },
};

/**
 * A provider for the DeleteTaskHandler class that retrieves the task specified in the request and instantiates a DeleteTaskHandler with it
 *
 * @returns a Provider object that can be used in a NestJS module to provide instances of DeleteTaskHandler
 */
const deleteTaskProvider: Provider = {
  provide: DeleteTaskHandler,
  inject: [TasksService, REQUEST],
  useFactory: async (tasksService: TasksService, request: Request) => {
    return new DeleteTaskHandler(await getTask(tasksService, request));
  },
};

/**
 * An array of providers that includes a provider for the ReadTaskHandler, UpdateTaskHandler, and DeleteTaskHandler
 */
export const taskPolicyProviders = [
  readTaskProvider,
  updateTaskProvider,
  deleteTaskProvider,
];
