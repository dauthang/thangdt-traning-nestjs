import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    const listUser = await this.userRepo
      .createQueryBuilder('user')
      .where('user.email = :email OR user.userName = :userName', {
        email: userData?.email,
        userName: userData?.userName,
      })
      .getMany();
    if (listUser && listUser.length > 0) {
      throw new HttpException('User exist', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const newUser = await this.userRepo.create(userData);
    await this.userRepo.save(newUser);

    return newUser;
  }

  async getById(id: string) {
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

  async updateUser(id: string, password: string) {
    const user = await this.getById(id);
    if (user) {
      return await this.userRepo.save({ ...user, password });
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
}
