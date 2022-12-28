import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

interface Response<t> {
  data: t;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    Logger.log(request.url, '正常接口请求');

    return next.handle().pipe(
      map((data) => {
        return {
          data: data,
          errorCode: 0,
          msg: 'success',
          success: true,
        };
      }),
    );
  }
}
