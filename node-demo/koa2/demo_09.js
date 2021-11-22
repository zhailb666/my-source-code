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
const session = require('koa-session')
const jwt = require('koa-jwt')
const jsonwebtoken = require('jsonwebtoken')

const app = new Koa();


const staticPath = './static'

console.log(__dirname, '__dirname')
app.use(static(
  path.join(__dirname,  staticPath)
))
app.use(favicon(__dirname + '/static/favicon.ico'));


const SECRET = 'zlb666';

app.use(jwt({ secret: SECRET }).unless({
  // 登录接口不需要验证
  path: [/^\/api\/login/, /^\/ses/]
}));

router.get('/ses',  (ctx, next) => {
  ctx.body="Hello koa";
    if (ctx.path === '/favicon.ico') return;
    console.log(ctx.session, 'ctx.session')
  let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  ctx.body = n + ' views';
})

const USER = {
  username: 'zlb',
  password: '123456',
  id: 100
}

router.get('/api/login',  (ctx, next) => {
    const { session } = ctx
    const { username, id }  = ctx.request.params
    console.log(username, id)
    const ct = jsonwebtoken.sign(
      { name: USER.username, id: USER.id },  // 加密userToken
      SECRET,
      { expiresIn: '60s' }
    )
    console.log(ct, 'token')
    ctx.cookies.set('token', ct, {httpOnly: false}); // browne -> document.cookie
    session[token] = user._id
    session[`${token}_uname`] = user.realname
    ctx.body = {
        code: 200,
        msg: '登录成功',
        token: ct
    }
})


router.get('/news', (ctx,next)=>{
  ctx.body="新闻page"
});

router.get('/news/:aid',async (ctx)=>{
  let token = ctx.header.authorization;
  const passObj = await jwt.verify(token.split(' ')[1], config.jwt.secret + '-' + process.env.NODE_ENV)
  console.log(passObj)
  if(passObj) {
    console.log(ctx.params); //{ aid: '123' }  //获取动态路由的数据
    ctx.body='这是商品页面_' + ctx.params.aid;
  } else {
    ctx.body='401';
  }
})

const SESS_CONFIG = {
  key: 'fe-ci:sess:' + 'dev', // cookie键名
  maxAge: 86400000, // 有效期，默认一天
  httpOnly: true, // 仅服务器修改
  signed: true // 签名cookie
}
app.keys = ['newest secret key', 'older secret key'];
app.use(session(SESS_CONFIG, app))


app.use(router.routes()); //作用：启动路由
app.use(router.allowedMethods()); // 作用： 这是官方文档的推荐用法,我们可以看到router.allowedMethods()用在了路由匹配router.routes()之后,所以在当所有路由中间件最后调用.此时根据ctx.status设置response响应头
app.listen(3000,()=>{
  console.log('starting at port 3000');
});