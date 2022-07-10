import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepo.findOneById(id);
  }

  async create(task: UserModel): Promise<User> {
    return await this.userRepo.save(task);
  }

  async update(task: UserModel): Promise<UpdateResult> {
    return await this.userRepo.update(task.id, task);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.userRepo.delete(id);
  }
}
