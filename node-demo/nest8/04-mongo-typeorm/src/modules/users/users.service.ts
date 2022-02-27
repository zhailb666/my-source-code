/*
 * @Author: your name
 * @Date: 2022-02-20 14:55:26
 * @Description: file content
 */
import { Model, ObjectId } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from 'src/entity/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  create(createUserDto: CreateUserDto) {
    console.log(createUserDto, 'createUserDto-=-');
    return this.usersRepository.save(createUserDto);
  }

  findAll() {
    return this.usersRepository.find({});
  }

  async findSome() {
    const order: any = {
      where: { name: 'zlb' },
      skip: 0,
      take: 3,
      order: {
        createAt: 'DESC',
      },
    };
    const [res, total] = await this.usersRepository.findAndCount(order);
    const data = res;
    return {
      data,
      total,
    };
  }

  findOne(id: string) {
    return this.usersRepository.findOne(id);
  }

  update(id: string, updateUserDto) {
    return this.usersRepository.update(id, { ...updateUserDto });
  }

  async remove(id: string) {
    const u = await this.usersRepository.findOne(id);
    console.log(u, 'u9999-----1212');
    return this.usersRepository.remove({ _id: id, ...u });
  }
}
