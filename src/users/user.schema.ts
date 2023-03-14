import { DB_TASK_MODEL } from '../constants';
import { TaskDocument } from 'tasks/task.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { UserStatus } from './user-status.enum';
import { User } from './user.interface';
import { hashPassword } from '../common/helpers/password-hashing';

@Schema({
  versionKey: false,
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id.toHexString();
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class UserDocument extends Document implements User {
  @Prop()
  username!: string;

  @Prop()
  password!: string;

  @Prop({
    enum: UserStatus,
    default: UserStatus.Inactive,
  })
  status!: UserStatus;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: DB_TASK_MODEL }] })
  tasks: TaskDocument[];
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);

UserSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    user.password = await hashPassword(user.password);
    delete this.password;
    next();
  } catch (error) {
    return next(error);
  }
});
