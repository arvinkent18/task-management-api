import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { PaginatedData } from '../interfaces/paginated-data.interface';
import { PaginatedResponse } from '../interfaces/paginated-response.interface';
import { QueryResponse } from '../interfaces/query-response.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, QueryResponse<T> | PaginatedResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<QueryResponse<T> | PaginatedResponse<T>> {
    return next.handle().pipe(
      map((data): QueryResponse<T> | PaginatedResponse<T> => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;

        if (!data || !Array.isArray(data)) {
          return {
            statusCode,
            data,
          };
        }

        const request = context.switchToHttp().getRequest();
        const page = Number(request.query.page) || 1;
        const limit = Number(request.query.limit) || 10;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const totalCount = data.length;

        const result = data.slice(startIndex, endIndex);

        const paginatedData: PaginatedData<T> = {
          data: result,
          page,
          limit,
          totalCount,
        };

        return {
          statusCode,
          data: paginatedData,
        };
      }),
    );
  }
}
