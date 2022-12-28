import { NestFactory } from '@nestjs/core';
import { HttpErrorFilter } from './common/error.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { AppModule } from './module/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpErrorFilter());
  await app.listen(3000);
}
bootstrap();
