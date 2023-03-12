import { HttpStatus } from '@nestjs/common';

export interface QueryResponse<T> {
  statusCode: HttpStatus;
  data: T;
}
