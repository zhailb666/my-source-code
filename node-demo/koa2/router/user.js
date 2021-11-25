/*
 * @Author: your name
 * @Date: 2021-11-25 22:38:21
 * @Description: file content
 */

const router = require('koa-router')()

router.get('/getUserInfo', (ctx, next) => {
    ctx.body = { name: 'zlb'}
})

module.exports = router
