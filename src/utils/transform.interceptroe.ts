import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ResponseWrapper<T> {
  status: number;
  data: T;
}
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ResponseWrapper<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseWrapper<T>> {
    const response = context.switchToHttp().getResponse<Response>();
    return next.handle().pipe(
      map((data: T) => ({
        status: response.statusCode, // 현재 response status 코드
        data, // controller에서 리턴한 값
      })),
    );
  }
}
