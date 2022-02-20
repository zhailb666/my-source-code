/*
 * @Author: your name
 * @Date: 2022-02-20 15:15:30
 * @Description: file content
 */
import { Connection } from 'mongoose';
import { UsersSchema } from './users.schema';

export const usersProviders = [
  {
    provide: 'USERS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('USERS', UsersSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
