/*
 * @Author: your name
 * @Date: 2022-02-27 16:59:00
 * @Description: file content
 */
import * as path from 'path';

const commonConfig = {
  type: 'mongodb',
  entities: [path.join(__dirname, '../entity', '*.entity.{ts,js}')],
  synchronize: true,
};

export default {
  dev: {
    ...commonConfig,
    host: 'localhost',
    database: 'admin',
  },
};
