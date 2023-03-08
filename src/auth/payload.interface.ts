import { Types } from 'mongoose';

export interface Payload {
  _id: Types.ObjectId;
  username: string;
}
