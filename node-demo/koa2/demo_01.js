/*
 * @Author: your name
 * @Date: 2021-11-17 21:25:40
 * @Description: koa 简单启动服务
 */
const Koa = require('koa')
const app = new Koa()


app.use( async ( ctx ) => {
  ctx.body = 'hello koa2'
})


app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')