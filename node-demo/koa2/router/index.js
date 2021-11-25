/*
 * @Author: your name
 * @Date: 2021-11-25 22:45:53
 * @Description: file content
 */
const fs = require('fs')
const router = require('koa-router')()


fs.readdirSync(__dirname).forEach((file) => {
    if(file !== 'index.js') {
        let k = require('./'+ file)
        router.use(k.routes())
    }
})  

module.exports = router
