/*
 * @Author: your name
 * @Date: 2022-04-17 16:48:37
 * @Description: file content
 */
/*
 * @Author: your name
 * @Date: 2021-11-17 21:25:40
 * @Description: koa-router使用
 */

const Koa = require('koa');
const router = require('koa-router')();  //注意：引入的方式
const static = require('koa-static')
const favicon = require('koa-favicon');
const path = require('path')
const koabody = require("koa-body");
const { createProxyMiddleware } = require('http-proxy-middleware');
const k2c = require('koa2-connect');

const app = new Koa();


const staticPath = './static'

console.log(__dirname, '__dirname')
app.use(static(
  path.join(__dirname,  staticPath)
))
app.use(favicon(__dirname + '/static/favicon.ico'));



router.get('/api/login',  (ctx, next) => {
    const { username, id }  = ctx.request.query
    console.log(username, id, ctx.request.query, '/api/login_get')
    ctx.body = {
        code: 200,
        msg: '登录成功',
        token: username
    }
})


router.get('/news', (ctx,next)=>{
  console.log(121312)
  ctx.body="新闻page"
});

router.delete('/delete', (ctx,next)=>{
  console.log(121312)
  ctx.body="新闻page"
});

app.use(async (ctx,next) => {
  if(ctx.url.startsWith('/api')) {
    ctx.respond = false
    await k2c(createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true
    }))(ctx, next)
  }
  next()
})

app.use(
  koabody({
    multipart: true,
    formidable: {
      keepExtensions: true,
      maxFieldsSize: 50 * 1024 * 1024, // 上传文件大小最大5M
    },
    onError: (err) => {
      console.log("koabody TCL: err", err);
    },
  })
);
app.use(router.routes()); //作用：启动路由
app.use(router.allowedMethods()); // 作用： 这是官方文档的推荐用法,我们可以看到router.allowedMethods()用在了路由匹配router.routes()之后,所以在当所有路由中间件最后调用.此时根据ctx.status设置response响应头
app.listen(3000,()=>{
  console.log('starting at port 3000');
});

