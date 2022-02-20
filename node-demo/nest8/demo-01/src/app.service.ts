/*
 * @Author: your name
 * @Date: 2022-02-19 21:21:55
 * @Description: file content
 */
import { Injectable } from '@nestjs/common';

// @Injectable 声明是一个可以被注入的对象（服务）
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
