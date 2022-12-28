import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserReq, Pager } from 'src/core/response';
import { User } from 'src/entity/user';
import { UserService } from 'src/service/user.service';
import { ApiTags, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('用户')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
  create(@Body() request: CreateUserReq) {
    return this.userService.create(request);
  }
}
