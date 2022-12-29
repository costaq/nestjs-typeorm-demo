import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { ApiTags, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Pager } from '../../src/core/pager';
import { CreateUser } from './users.dto';

@ApiTags('用户')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: '用户id',
  })
  getUser(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Get()
  @ApiQuery({
    name: 'pageIndex',
    description: '分页索引',
  })
  @ApiQuery({
    name: 'pageSize',
    description: '分页数',
  })
  @ApiQuery({
    name: 'userName',
    required: false,
    description: '用户名',
  })
  @ApiQuery({
    name: 'displayName',
    required: false,
    description: '显示名',
  })
  getUsers(
    @Query('pageIndex') pageIndex: number,
    @Query('pageSize') pageSize: number,
    @Query('userName') userName: string,
    @Query('displayName') displayName: string,
  ): Promise<Pager<User>> {
    return this.userService.findAll(pageIndex, pageSize, userName, displayName);
  }

  @Post('create')
  create(@Body() request: CreateUser) {
    return this.userService.create(request);
  }
}
