/*
 * @Author: your name
 * @Date: 2022-02-20 15:13:50
 * @Description: file content
 */
import * as mongoose from 'mongoose';
import { User } from '../entities/user.entity';

export const UsersSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
});
