/*
 * @Author: your name
 * @Date: 2021-11-17 21:25:40
 * @Description: koa-router使用
 */

const Koa = require('koa');
const app = new Koa();
const router = require('./router')

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000,()=>{
  console.log('starting at port 3000');
});