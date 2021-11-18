/*
 * @Author: your name
 * @Date: 2021-11-18 21:51:25
 * @Description: file content
 */
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/admin', { useNewUrlParser: true}, (err) => {
    if(err) {
      return  console.log(err)
    }
    console.log('数据库链接成功')
});

module.exports = mongoose;