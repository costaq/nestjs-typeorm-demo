import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CreateUser } from './users.dto';
import { User } from './users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfig from '../common/typeorm.config';

describe('UsersController', () => {
  let appController: UsersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([User]), typeormConfig],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    appController = app.get<UsersController>(UsersController);
  });

  describe('users api', () => {
    it('create user', async () => {
      const createUser: CreateUser = {
        userName: 'test4',
        displayName: '测试',
        password: '1234567',
      };
      const response = await appController.create(createUser);
      expect(response).toBeUndefined();
    });
  });
});
