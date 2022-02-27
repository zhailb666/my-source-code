/*
 * @Author: your name
 * @Date: 2022-02-19 21:49:15
 * @Description: file content
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import dbConfig from './db/config';

const env = process.env.NODE_ENV;

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig[env]), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
