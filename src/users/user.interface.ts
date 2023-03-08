import { Types } from 'mongoose';
import { UserStatus } from './user-status.enum';

export interface User {
  _id?: Types.ObjectId,
  username: string;
  password: string;
  status: UserStatus;
}
