/*
 * @Author: your name
 * @Date: 2021-11-17 21:25:40
 * @Description: koa-body 中间件，
 * http://www.ptbird.cn/koa-body.html
 */

const Koa = require("koa");
const path = require('path')
const static = require('koa-static')
const favicon = require('koa-favicon');

const app = new Koa();
const staticPath = './static'

console.log(__dirname, '__dirname')
app.use(static(
  path.join(__dirname,  staticPath)
))
app.use(favicon(__dirname + '/static/favicon.ico'));

app.use( async ( ctx ) => {
  ctx.body = 'hello world'
})

app.listen(3000, () => {
  console.log("starting at port 3000");
});
