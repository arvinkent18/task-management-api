import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';
import { TaskSchema } from './task.schema';
import { TasksController } from './tasks.controller';
import { DB_TASK_MODEL } from '../constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ 
      name: DB_TASK_MODEL, 
      schema: TaskSchema, 
    }]),
  ],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
