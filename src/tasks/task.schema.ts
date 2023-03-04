import { Task as TaskInterface } from './task.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TaskStatus } from './task-status.enum';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task implements TaskInterface {
  @Prop({ required: true })
  title!: string;

  @Prop()
  description!: string;

  @Prop({ default: false })
  completed!: boolean;

  @Prop({ enum: TaskStatus, default: TaskStatus.OPEN })
  status!: TaskStatus;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
