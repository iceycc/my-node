// nextTick
// node事件环 setTime nextTick

// node10以后执行结果和浏览器一样了，但是实现原理不一样

// https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/


// - timers:  定时器：本阶段执行已经被 setTimeout() 和 setInterval() 的调度回调函数。
// pending callbacks:   待定回调：执行延迟到下一个循环迭代的 I/O 回调。最大回调数，电脑性能影响。
// idle,prepare：仅系统内部使用。
// - poll： 轮询：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和 setImmediate() 调度的之外），其余情况 node 将在适当的时候在此阻塞。
// - check：检测：setImmediate() 回调函数在这里执行。
// close callbacks：关闭的回调函数：一些关闭的回调函数，如：socket.on('close', ...)。

// 默认从上倒下，eventLoop线程执行异步非阻塞调用

// 以下都是宏任务, 依次清空每个队列中的回调方法，没调用一个宏任务会清空一次微任务
// 宏任务（老版本，没清空一个队列才会执行微任务队列）
// timers [setTimeoutFn,setTimeoutFn] 定时器setTimeout的回调,定时器到时间才会放进去；
// poll [fsFn,fsFn] 大多数I/O的回调方法
// check [immediateFn] setImmediate回调

// 主栈
// -》检测时间有没有达到的定时任务，执行，清空任务
// -》poll循环（I/O操作），清空poll队列
// -》先check检测是否有immediate回调完成
// -》有的话清空immediate，然后回timers；没有的话直接检测timers队列，进行循环

// process.nextTick 不是事件环的一部分，优先于微任务，在执行栈低
// setTimeout(()=>{
//     console.log('setTimeout')
// })
// Promise.resolve(1).then(res=>{
//     console.log('then')
// })
// process.nextTick(()=>{
//     console.log('nextTick')
// })
// nextTick - then - setTimeout

// 以下的不一定，受性能影响。
// 放到io就确定了，先poll-》check-》timers
setTimeout(() => {
    console.log('setTimeout')
})
setImmediate(() => {
    console.log('setImmediate')
})

const fs = require('fs')
const path = require('path')
fs.readFile(path.resolve(__dirname, './node.md'), (err, data) => {
    setTimeout(() => {
        console.log('setTimeout')
    })
    setImmediate(() => {
        console.log('setImmediate')
    })
})
