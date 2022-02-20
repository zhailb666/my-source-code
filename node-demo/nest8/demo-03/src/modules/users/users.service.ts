/*
 * @Author: your name
 * @Date: 2022-02-20 14:55:26
 * @Description: file content
 */
import { Model, ObjectId } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_MODEL')
    private usersModel: Model<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    const createdCat = new this.usersModel(createUserDto);
    return createdCat.save();
  }

  findAll() {
    return this.usersModel.find({}).exec();
  }

  findOne(id: String) {
    return this.usersModel.find({ _id: id });
  }

  update(id: String, updateUserDto: UpdateUserDto) {
    return this.usersModel.updateOne({ _id: id }, updateUserDto).exec();
  }

  remove(id: String) {
    return this.usersModel.findByIdAndRemove(id).exec();
  }
}
