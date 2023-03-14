import { Request } from 'express';
import { TasksService } from '../../tasks/tasks.service';
import { Provider } from '@nestjs/common';
import { ReadTaskHandler } from '../../authorization/handlers/read-task.handler';
import { REQUEST } from '@nestjs/core';
import { TaskDocument } from 'tasks/task.schema';

async function getTask(tasksService: TasksService, request: Request): Promise<TaskDocument> {
  const { id } = request.params;
  const task = await tasksService.findTaskById(id);

  return task;
}

const readTaskProvider: Provider = {
  provide: ReadTaskHandler,
  inject: [TasksService, REQUEST],
  useFactory: async(tasksService: TasksService, request: Request) => {
    return new ReadTaskHandler(await getTask(tasksService, request));
  }
}

export const taskPolicyProviders = [
  readTaskProvider,
]