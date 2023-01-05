import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { RedisModule } from 'nestjs-redis';
import customConfig from './config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 做用于全局
      load: [customConfig], // 加载自定义配置项
    }),
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get('REDIS_CONFIG'),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // 数据库配置项依赖于ConfigModule，需在此引入
      useFactory: (configService: ConfigService) =>
        configService.get('DATABASE_CONFIG'),
      inject: [ConfigService], // 记得注入服务，否则useFactory函数中获取不到ConfigService
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
