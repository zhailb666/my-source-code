/*
 * @Author: your name
 * @Date: 2021-11-17 21:25:40
 * @Description: koa-body 中间件，
 * http://www.ptbird.cn/koa-body.html
 */

const Koa = require("koa");
const path = require("path");
const router = require("koa-router")(); //注意：引入的方式
const axios = require("axios");
const koabody = require("koa-body");
require("./models/db");

const Student = require("./models/Student");
// require("./models/Student");

const mongoose = require("mongoose");

const app = new Koa();

router.get("/", async (ctx, next) => {
  const res = await axios({
    method: "POST",
    url: "http://localhost:3000/user/login",
    data: {
      a: 1,
      b: 2,
      c: 3,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(res.data, "res");
  ctx.body = res.data || "Hello koa";
});

router.get("/create", async (ctx, next) => {
  const student = new Student({
    name: "zlb003",
    age: 18,
    sex: 1,
    extends: {
      a: 12,
      b: 3,
    },
  });
  await student.save();
  ctx.body = "创建成功";
});

router.get("/create2", async (ctx, next) => {
  // const Student2 = mongoose.model("Student", {});
  const Student2 = mongoose.model("Student");
  const student = new Student2({
    name: "zlb00_3",
    age: 18,
    sex: 1,
    a: 1,
  });
  await student.save();
  ctx.body = "创建成功";
});

router.get("/findAll", async (ctx, next) => {
  const res = await Student.find({}).exec();
  console.log(res);
  ctx.body = res;
});

router.get("/findOne", async (ctx, next) => {
  const { id } = ctx.query
  try {
    const res = await Student.find({_id: id}).exec();
    console.log(res.req);
    ctx.body = res;
  }catch(e) {
    ctx.body=`id=${id}:查询失败`
  }
});

router.get("/update", async (ctx, next) => {
  const res = await Student.updateMany({}, {name: '亦风'}).exec();
  console.log(res);
  ctx.body = res;
});

router.get("/updateOne", async (ctx, next) => {
  const { id } = ctx.query
  const res = await Student.updateOne({_id: id}, {sex: false}).exec();
  console.log(res);
  ctx.body = res;
});

router.get("/findByIdAndDelete", async (ctx, next) => {
  const { id } = ctx.query
  const res = await Student.findByIdAndDelete(id).exec();
  console.log(res);
  ctx.body = res;
});

router.get("/findByIdAndRemove", async (ctx, next) => {
  const { id } = ctx.query
  const res = await Student.findByIdAndRemove(id).exec();
  console.log(res);
  ctx.body = res;
});

router.post("/user/login", async (ctx) => {
  console.log(ctx.request.body); //{ aid: '123' }  //获取动态路由的数据
  const {
    body: { a, b, c },
  } = ctx.request;
  const result = "这是商品页面_" + ctx.params.aid + `${a}_${b}_${c}`;
  ctx.body = result;
  console.log(1213);
  return result;
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

app.listen(3000, () => {
  console.log("starting at port 3000");
});
