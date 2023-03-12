import { HttpStatus } from '@nestjs/common';
import { PaginatedData } from './paginated-data.interface';

export interface PaginatedResponse<T> {
  statusCode: HttpStatus;
  data: PaginatedData<T>;
}