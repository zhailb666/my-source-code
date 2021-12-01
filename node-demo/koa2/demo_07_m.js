/*
 * @Author: your name
 * @Date: 2021-11-17 21:25:40
 * @Description: koa-body 中间件，
 * http://www.ptbird.cn/koa-body.html
 */

const Koa = require("koa");
const router = require("koa-router")(); //注意：引入的方式
const koabody = require("koa-body");
require("./models/db");

const Order = require("./models/Order");
const OrderItem = require("./models/OrderItem");
const mongoose = require("mongoose");

const app = new Koa();


router.get("/initOrder", async (ctx, next) => {
  const order = new Order({"order_id":"1","uid":10,"trade_no":"111","all_price":100,"all_num":2});
  await order.save();
  const order1 = new Order({"order_id":"2","uid":7,"trade_no":"222","all_price":90,"all_num":2});
  await order1.save();
  const order2 = new Order({"order_id":"3","uid":9,"trade_no":"333","all_price":20,"all_num":6});
  await order2.save();
  ctx.body = "创建成功";
});

router.get("/initOrderItem", async (ctx, next) => {
  const orderItem = new OrderItem({"order_id":"1","title":"商品鼠标 1","price":50,num:1});
  await orderItem.save();
  const orderItem1 = new OrderItem({"order_id":"1","title":"商品鼠标 2","price":50,num:1});
  await orderItem1.save();
  const orderItem2 = new OrderItem({"order_id":"1","title":"商品鼠标 3","price":50,num:1});
  await orderItem2.save();
  const orderItem3 = new OrderItem({"order_id":"2","title":"牛奶","price":50,num:1});
  await orderItem3.save();
  const orderItem4 = new OrderItem({"order_id":"2","title":"酸奶","price":40,num:1});
  await orderItem4.save();
  const orderItem5 = new OrderItem({"order_id":"3","title":"矿泉水","price":2,num:5});
  await orderItem5.save();
  const orderItem6 = new OrderItem({"order_id":"3","title":"毛巾","price":10,num:1});
  await orderItem6.save();
  ctx.body = "创建成功";
});

router.get("/findOrder", async (ctx, next) => {
  // order表关联order_item
  const res = await Order.aggregate([
    {
      $lookup:
        {
          from: "orderItems",
          localField: "order_id",
          foreignField: "order_id",
          as: "items"
        }
    }, { $match:{ order_id: '1' } }
  ]).exec()
  ctx.body = res
});

// 根据orderItem 查询 order
router.get("/findOrderByItem", async (ctx, next) => {
  // order表关联order_item
  const res = await OrderItem.aggregate([
    {
      $lookup:
        {
          from: "orders",
          localField: "order_id",
          foreignField: "order_id",
          as: "order_info"
        }
    },{
    $match:{_id: mongoose.Types.ObjectId('61a783aab892ca5c6b78a4a3')}
  }
  ]).exec()
  ctx.body = res
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
