import { DB_USER_MODEL } from '../constants';
import { UserDocument } from '../users/user.schema';
import { Task } from './task.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { TaskStatus } from './task-status.enum';
@Schema({ timestamps: true })
export class TaskDocument extends Document implements Task {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: DB_USER_MODEL })
  author!: UserDocument;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({
    enum: TaskStatus,
    default: TaskStatus.Open,
  })
  status!: TaskStatus;
}

export const TaskSchema = SchemaFactory.createForClass(TaskDocument);
