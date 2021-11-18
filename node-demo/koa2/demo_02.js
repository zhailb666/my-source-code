/*
 * @Author: your name
 * @Date: 2021-11-17 21:25:40
 * @Description: koa2 的 async await 使用
 */
const Koa = require('koa')
const app = new Koa()


function findData() {
  return new Promise(resolve => {
    setTimeout(() => resolve("long_time_value"), 1000);
  });
}

async function test() {
  const v = await findData();
  console.log(v);
  return v
}

app.use( async ( ctx ) => {
  const res = await test()
  ctx.body = res
})


app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')