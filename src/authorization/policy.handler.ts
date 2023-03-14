import { UserDocument } from '../users/user.schema';

export interface PolicyHandler {
  handle(user: UserDocument): boolean;
}

