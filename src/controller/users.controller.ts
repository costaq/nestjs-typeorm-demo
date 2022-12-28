import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserReq } from 'src/core/response';
import { User } from 'src/entity/user';
import { UserService } from 'src/service/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUser(id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post('create')
  create(@Body() request: CreateUserReq) {
    return this.userService.create(request);
  }
}
