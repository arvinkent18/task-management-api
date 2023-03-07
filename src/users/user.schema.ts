import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserStatus } from './user-status.enum';
import { User } from './user.interface';

@Schema()
export class UserDocument extends Document implements User {
  @Prop({ required: true })
  username!: string;

  @Prop({ required: true })
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
