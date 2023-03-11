import { HttpStatus } from '@nestjs/common';
import { User } from '../../users/user.interface';

export interface QueryResponse {
  statusCode: HttpStatus;
  data: User;
}
