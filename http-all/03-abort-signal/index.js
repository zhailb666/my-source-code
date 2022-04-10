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
const axios = require("axios");
const koabody = require("koa-body");

const app = new Koa();


const staticPath = './static'

console.log(__dirname, '__dirname')
app.use(static(
  path.join(__dirname,  staticPath)
))
app.use(favicon(__dirname + '/static/favicon.ico'));


router.get('/ses/d',  async (ctx, next) => {
   await ctx.render('index', {title: '哈哈'})
})

router.get('/ses',  (ctx, next) => {
  ctx.body="Hello koa";
    if (ctx.path === '/favicon.ico') return;
    console.log(ctx.session, 'ctx.session')
  let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  ctx.body = n + ' views';
})

router.get('/ses/afe',  async (ctx, next) => {
  const res = await axios({
    method: "GET",
    url: "http://localhost:3000/news",
    headers: {
      "Content-Type": "application/json",
      "authorization": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiemxiIiwiaWQiOjEwMCwiaWF0IjoxNjM3Njc1NTA0LCJleHAiOjE2Mzc2NzU2MjR9.E3PWo88bk45wEj_kiFbS2zYzBfIDLv_0b7-PHK6Vmno'
    },
  });
  console.log(res.data, "res");
  ctx.body = res.data || "Hello koa";
})


router.get('/api/login',  (ctx, next) => {
    const { username, id }  = ctx.request.query
    console.log(username, id, ctx.request.query)
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

router.get('/await5s', (ctx,next)=>{
  const t = Date.now()
  while(Date.now() - t < 5000) {}
  ctx.body="新闻page"
});

router.get('/await1s', (ctx,next)=>{
  const t = Date.now()
  while(Date.now() - t < 1000) {}
  ctx.body="新闻page"
});


// app.use(cors())
app.use(async (ctx, next)=> {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200; 
  } else {
    await next();
  }
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
app.listen(3000,()=>{
  console.log('starting at port 3000');
});