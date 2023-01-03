import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonRedisService } from 'src/commonRedis/commonRedis.service';
import { UsersController } from 'src/users/users.controller';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, CommonRedisService],
  controllers: [UsersController],
})
export class UserModule {}
