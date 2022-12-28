import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorCode } from 'src/core/enum';
import { ERROR_MSG } from 'src/core/errorMsg';
import { CreateUserReq } from 'src/core/response';
import { User } from 'src/entity/user';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(request: CreateUserReq): Promise<void> {
    const { userName, displayName, password } = request;
    const user = this.usersRepository.findOne({ where: { userName } });
    if (user) {
      throw new HttpException(
        ERROR_MSG[ErrorCode.USER_EXIST],
        ErrorCode.USER_EXIST,
      );
    }
    const userToBeSaved = new User(userName, displayName, password);
    await this.usersRepository.save(userToBeSaved);
  }
}
