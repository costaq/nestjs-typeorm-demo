import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CreateUser } from './users.dto';
import { User } from './users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import customConfig from '../config';
import { CommonRedisService } from '../commonRedis/commonRedis.service';

describe('UsersController', () => {
  let appController: UsersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true, // 做用于全局
          load: [customConfig], // 加载自定义配置项
        }),
        RedisModule.forRootAsync({
          useFactory: (configService: ConfigService) => {
            return configService.get('REDIS_CONFIG');
          },
          inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule], // 数据库配置项依赖于ConfigModule，需在此引入
          useFactory: (configService: ConfigService) =>
            configService.get('DATABASE_CONFIG'),
          inject: [ConfigService], // 记得注入服务，否则useFactory函数中获取不到ConfigService
        }),
      ],
      controllers: [UsersController],
      providers: [UsersService, CommonRedisService],
    }).compile();

    appController = app.get<UsersController>(UsersController);
  });

  describe('users api', () => {
    it('create user', async () => {
      const createUser: CreateUser = {
        userName: 'test',
        displayName: '测试',
        password: '1234567',
      };
      const response = await appController.create(createUser);
      expect(response).toBeUndefined();
    });
  });
});
