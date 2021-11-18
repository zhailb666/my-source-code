/*
 * @Author: your name
 * @Date: 2021-11-17 21:25:40
 * @Description: 洋葱模型， 多个中间件会形成一个栈结构（middle stack），
 * 以"先进后出"（first-in-last-out）的顺序执行
 */

const Koa = require('koa');
const router = require('koa-router')();  //注意：引入的方式
const app = new Koa();


router.get('/',  (ctx, next) => {
  ctx.body="Hello koa";
})


router.get('/news', (ctx,next)=>{
  ctx.body="新闻page"
});

router.get('/news/:aid',async (ctx)=>{
   console.log(ctx.params); //{ aid: '123' }  //获取动态路由的数据
   ctx.body='这是商品页面_' + ctx.params.aid;
   console.log(1213)
})

app.use(async (ctx, next) => {
    console.log('1'); 
    await next(); // 调用下一个middleware
    console.log('5')
});
app.use(async (ctx, next) => {
    console.log('2');
    await next(); // 调用下一个middleware
    console.log('4');
});
app.use(async (ctx, next) => {
    console.log('3');
    await next(); // 调用下一个middleware
    console.log('6');
});

app.use(router.routes()); //作用：启动路由
app.use(router.allowedMethods()); // 作用： 这是官方文档的推荐用法,我们可以看到router.allowedMethods()用在了路由匹配router.routes()之后,所以在当所有路由中间件最后调用.此时根据ctx.status设置response响应头

app.listen(3000,()=>{
  console.log('starting at port 3000');
});