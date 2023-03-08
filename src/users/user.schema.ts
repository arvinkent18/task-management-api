import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserStatus } from './user-status.enum';
import { User } from './user.interface';
import { hashPassword } from '../common/helpers/password-hashing';

@Schema()
export class UserDocument extends Document implements User {
  @Prop()
  username!: string;

  @Prop()
  password!: string;

  @Prop({
    enum: UserStatus,
    default: UserStatus.INACTIVE,
  })
  status!: UserStatus;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);

UserSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    user.password = await hashPassword(user.password);
    next();
  } catch (error) {
    return next(error);
  }
});
