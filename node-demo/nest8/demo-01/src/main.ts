/*
 * @Author: your name
 * @Date: 2022-02-19 21:21:55
 * @Description: file content
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// main.js 是入口文件
// NestFactory 创建一个应用
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
