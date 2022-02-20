/*
 * @Author: your name
 * @Date: 2022-02-19 21:49:15
 * @Description: file content
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller()
@ApiTags('app总模块')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: '测试接口' })
  getHello(): string {
    return this.appService.getHello();
  }
}
