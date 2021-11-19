/*
 * @Author: your name
 * @Date: 2021-11-17 21:25:40
 * @Description: koa-router使用
 */

const Koa = require("koa");
const router = require("koa-router")(); //注意：引入的方式
const app = new Koa();
const axios = require("axios");

router.get("/", (ctx, next) => {
  ctx.body = "Hello koa";
});

/**
 *
curl -X POST -H "Content-Type: application/json" \
-d '{"msg_type":"text","content":{"text":"request example"}}' \
https://open.feishu.cn/open-apis/bot/v2/hook/9086a315-2250-4ae0-953a-bd0c9c146662
*/

// webhook
router.get("/news", async (ctx, next) => {
  const res = await axios({
    method: "POST",
    url: "https://open.feishu.cn/open-apis/bot/v2/hook/9086a315-2250-4ae0-953a-bd0c9c146662",
    data: {
      msg_type: "text",
      content: { text: "周末去那玩耍啊~~~~" },
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  ctx.body = "发送成功";
});

router.get("/interactive", async (ctx, next) => {
  const res = await axios({
    method: "POST",
    url: "https://open.feishu.cn/open-apis/bot/v2/hook/9086a315-2250-4ae0-953a-bd0c9c146662",
    data: {
      msg_type: "interactive",
      card: {
        config: {
          wide_screen_mode: true,
          enable_forward: true,
        },
        elements: [
          {
            tag: "div",
            text: {
              content:
                "**西湖**，位于浙江省杭州市西湖区龙井路1号，杭州市区西部，景区总面积49平方千米，汇水面积为21.22平方千米，湖面面积为6.38平方千米。",
              tag: "lark_md",
            },
          },
          {
            actions: [
              {
                tag: "button",
                text: {
                  content: "更多景点介绍 :玫瑰:", // 可以到飞书上点击图片会显示中文
                  tag: "lark_md",
                },
                url: "https://www.example.com",
                type: "default",
                value: {},
              },
            ],
            tag: "action",
          },
        ],
        header: {
          title: {
            content: "今日旅游推荐",
            tag: "plain_text",
          },
        },
      },
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  ctx.body = "发送成功";
});

router.get("/news/:aid", async (ctx) => {
  console.log(ctx.params); //{ aid: '123' }  //获取动态路由的数据
  ctx.body = "这是商品页面_" + ctx.params.aid;
});

app.use(router.routes()); //作用：启动路由
app.use(router.allowedMethods()); // 作用： 这是官方文档的推荐用法,我们可以看到router.allowedMethods()用在了路由匹配router.routes()之后,所以在当所有路由中间件最后调用.此时根据ctx.status设置response响应头
app.listen(3000, () => {
  console.log("starting at port 3000");
});
