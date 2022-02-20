/*
 * @Author: your name
 * @Date: 2022-02-19 21:49:15
 * @Description: file content
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [DbModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
