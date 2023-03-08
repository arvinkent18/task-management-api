import { UserStatus } from './user-status.enum';

export interface User {
  username: string;
  password: string;
  status: UserStatus;
}
