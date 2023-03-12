import { Types } from 'mongoose';

export interface Payload {
  id: Types.ObjectId;
  username: string;
}
