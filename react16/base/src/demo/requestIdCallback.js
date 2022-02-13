/*
 * @Author: your name
 * @Date: 2022-02-13 17:38:58
 * @Description: file content
 */
function sleep(delay) {
    for(var ts = Date.now(); Date.now() -ts <= delay;){}
}

const sleepTime = 10
const works = [() => {
    console.log('任务1 start')
    sleep(sleepTime)
    console.log('任务2 end')
},() => {
    console.log('任务2 start')
    sleep(sleepTime)
    console.log('任务3 end')
},() => {
    console.log('任务3 start')
    sleep(sleepTime)
    console.log('任务3 end')
}]
requestIdleCallback(worksLoop, {time: 0})

setTimeout(() => {
    console.log('setTimeout-start')
    sleep(10)
    console.log('setTimeout-end')
}, 1000) 

//  requestIdleCallback 存在兼容想， react使用 messageChannel + requestAnimationFrame 模拟其功能的
function worksLoop(deadline) {
    console.log(`本帧的剩余时间是（${parseInt(deadline.timeRemaining())}）`)
    while(deadline.timeRemaining() > 1 && works.length > 0) {
        performUnitOfWork();
    }
    if(works.length > 0) {
        requestIdleCallback(worksLoop)
    } 
}

function performUnitOfWork() {
    let work = works.shift()
    work()
}

// 调度， 调和， 提交(同步的不能中断)