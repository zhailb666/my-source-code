/*
 * @Author: your name
 * @Date: 2022-04-17 18:02:45
 * @Description: file content
 */

const Koa = require('koa');
const router = require('koa-router')();  //注意：引入的方式
const koabody = require("koa-body");

const app = new Koa();

router.get('/',  (ctx, next) => {
    ctx.body = 'hello world!'
})

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
app.listen(8081,()=>{
  console.log('starting at port 8080');
});

