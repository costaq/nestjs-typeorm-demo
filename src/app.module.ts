import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import typeormConfig from './common/typeorm.config';
import { RedisModule } from 'nestjs-redis';
import redisConfig from './common/redis.config';

@Module({
  imports: [RedisModule.register(redisConfig), typeormConfig, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
