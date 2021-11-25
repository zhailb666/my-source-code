/*
 * @Author: your name
 * @Date: 2021-11-25 22:38:21
 * @Description: file content
 */

const router = require('koa-router')()

router.get('/getGoodsInfo', (ctx, next) => {
    ctx.body = { price: '999'}
})

module.exports = router
