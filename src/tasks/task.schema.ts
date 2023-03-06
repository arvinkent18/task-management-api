import { Task } from './task.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TaskStatus } from './task-status.enum';
@Schema()
export class TaskDocument extends Document implements Task {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ 
    enum: TaskStatus, 
    default: TaskStatus.OPEN, 
  })
  status!: TaskStatus;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}

export const TaskSchema = SchemaFactory.createForClass(TaskDocument);
