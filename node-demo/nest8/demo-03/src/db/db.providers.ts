/*
 * @Author: your name
 * @Date: 2022-02-20 13:59:25
 * @Description: file content
 */
import * as mongoose from 'mongoose';

export const DbProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://localhost/admin'),
  },
];
