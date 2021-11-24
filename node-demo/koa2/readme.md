<!--
 * @Author: your name
 * @Date: 2021-11-17 22:50:24
 * @Description: file content
-->

- demo_feshu webhook 机器人消息推送
- demo_01 koa 简单启动服务
- demo_02 koa2 的 async await 使用
- demo_03 koa-router 使用
- demo_04 koa2 中间件机制（洋葱模型）
- demo_05 手动实现的 bodyparser
- demo_06 中间件 koa-body
- demo_07 mongoose 简单的 增删改查 功能； mongoose.model("Student") 注册一次后不能重复注册相同的 key
- demo_08 koa-static 服务器静态资源加载
- demo_09 koa-session koa-jwt jsonwebtoken 服务器静态资源加载
- demo_10 koa-views ejs

other:
- koa2-cors 解决跨域问题不做演示了
- koa2-helmet 处理网址安全 https://zhuanlan.zhihu.com/p/268891086
- koa-compress 从服务器发送响应时，如果使用压缩，则可以大大缩短加载时间 https://iowiki.com/koajs/koajs_compression.html
```
var Koa = require('koa');
var cors = require('koa2-cors');


var app = new Koa();
app.use(
  cors({
    origin: '*',
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'token']
  })
)
```
