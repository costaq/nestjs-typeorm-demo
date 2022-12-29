import { ApiProperty } from '@nestjs/swagger';

export class CreateUser {
  @ApiProperty({
    description: '用户名',
  })
  userName: string;

  @ApiProperty({
    description: '显示名',
  })
  displayName: string;

  @ApiProperty({
    description: '密码',
  })
  password: string;
}
