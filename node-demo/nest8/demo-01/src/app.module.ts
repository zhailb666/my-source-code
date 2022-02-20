/*
 * @Author: your name
 * @Date: 2022-02-19 21:21:55
 * @Description: file content
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// @Module 声明是一个模块
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
