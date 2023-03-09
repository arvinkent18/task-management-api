import { Task } from './task.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { TaskStatus } from './task-status.enum';
@Schema({ timestamps: true })
export class TaskDocument extends Document implements Task {
  @Prop({
    name: 'user_id',
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId!: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({
    enum: TaskStatus,
    default: TaskStatus.OPEN,
  })
  status!: TaskStatus;
}

export const TaskSchema = SchemaFactory.createForClass(TaskDocument);
