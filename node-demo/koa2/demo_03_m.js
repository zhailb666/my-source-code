/*
 * @Author: your name
 * @Date: 2021-11-17 21:25:40
 * @Description: koa-router使用
 */

const Koa = require('koa');
const router = require('koa-router')();  //注意：引入的方式
const app = new Koa();
const userRouter = require('./router/user')
const goodsRouter = require('./router/goods')


router.get('/',  (ctx, next) => {
  ctx.body="Hello koa";
})

router.get('/news', (ctx,next)=>{
  ctx.body="新闻page"
});

app.use(router.routes()); //作用：启动路由
app.use(userRouter.routes());
app.use(goodsRouter.routes());
app.use(router.allowedMethods()); // 作用： 这是官方文档的推荐用法,我们可以看到router.allowedMethods()用在了路由匹配router.routes()之后,所以在当所有路由中间件最后调用.此时根据ctx.status设置response响应头
app.listen(3000,()=>{
  console.log('starting at port 3000');
});