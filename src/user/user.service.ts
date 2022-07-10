import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dto/userDto.dto';
import { STATUS } from '../const/constants.const';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async getByEmail(email: string) {
    const user = await this.userRepo.findOneBy({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async createUser(userData: UserDto) {
    const newUser = await this.userRepo.create(userData);
    await this.userRepo.save(newUser);
    return newUser;
  }

  async getById(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async markEmailAsConfirmed(email: string) {
    return this.userRepo.update(
      { email },
      {
        status: STATUS.ACTIVE,
      },
    );
  }
}
