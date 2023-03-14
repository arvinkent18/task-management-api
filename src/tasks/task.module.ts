import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';
import { TaskSchema } from './task.schema';
import { TasksController } from './tasks.controller';
import { DB_TASK_MODEL } from '../constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DB_TASK_MODEL,
        schema: TaskSchema,
      },
    ]),
  ],
  providers: [
    TasksService,
    {
      provide: DB_TASK_MODEL,
      useValue: DB_TASK_MODEL,
    },
  ],
  controllers: [TasksController],
  exports: [
    TasksService, 
    MongooseModule,
    DB_TASK_MODEL,
  ],
})
export class TasksModule {}
