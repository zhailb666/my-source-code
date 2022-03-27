/*
 * @Author: your name
 * @Date: 2022-03-21 21:39:11
 * @Description: file content
 */
const fs  = require("fs");
const path  = require("path");


let initTime =  Date.now()
let init =  Date.now()
const delay20 = function() {
    console.log(`fileReadTime:${Date.now()-initTime}`)
    initTime = Date.now()
    while(Date.now() - initTime < 20) {}
}

setTimeout(function() {
    console.log(Date.now() - initTime)
    console.log(`setTimeout:${Date.now()-init}`)
},10)

console.log(path.resolve(__dirname, '../README.md'))

fs.readFile(path.resolve(__dirname, '../README.md'), delay20)

// 🤔 如果读取的时间耗时 > setTimeout的时间会变成啥；