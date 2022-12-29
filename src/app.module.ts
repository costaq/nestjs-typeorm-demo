import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import typeormConfig from './common/typeorm.config';

@Module({
  imports: [typeormConfig, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
