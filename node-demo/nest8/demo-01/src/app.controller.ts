/*
 * @Author: your name
 * @Date: 2022-02-19 21:21:55
 * @Description: file content
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// @Controller 声明是一个控制器
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
