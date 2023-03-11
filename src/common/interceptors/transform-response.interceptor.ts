import { QueryResponse } from '../interfaces/query-response.interface';
import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, QueryResponse>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<QueryResponse> {
    return next.handle().pipe(
      map((data): QueryResponse => {
        const response = context.switchToHttp().getResponse();
        const statusCode: HttpStatus = response.statusCode;

        return {
          statusCode,
          data,
        };
      }),
    );
  }
}
