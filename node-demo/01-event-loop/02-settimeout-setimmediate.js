/*
 * @Author: your name
 * @Date: 2022-03-21 21:39:11
 * @Description: file content
 */

process.nextTick(() => {
    console.log('nextTick_1')
})

setTimeout(() => {
    console.log('setTimeout')
    process.nextTick(() => {
        console.log('setTimeout-nextTick')
    })
}, 1)

process.nextTick(() => {
    console.log('nextTick0')
})

setImmediate(() => {
    console.log('setImmediate')
    process.nextTick(() => {
     console.log('setImmediate-nextTick')
    })
})

process.nextTick(() => {
    console.log('nextTick1')
})

// 🤔 这两个先后顺序为啥不是固定的，有时候setTimeout先执行也有的时候setImmediate先执行

/**
 * answer: 这取决于(eventLoop启动时间 + 执行到 poll时间)t, 若执行到poll阶段已经大于 1ms
 * 此时 setTimeout会优先执行；反之setImmediate先执行
 */
  
