import { Body, Controller, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.interface';
import { TasksService } from './tasks.service';
import { ApiBody } from '@nestjs/swagger';
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiBody({
    type: CreateTaskDto,
  })
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }
}
