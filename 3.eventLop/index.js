// EventLoop
// 应用-》进程-〉线程

// js主进程是单线程的
// 浏览器 多进程
// 一个tab一个进程
// 每个tab进程：
// 渲染进程 + Js执行进程 ： 两者互斥，
//  1、不能同一进行。
//  2、主线程是单线程的，js代码从上倒下一行一行执行
//  3、异步方法：ajax事件、promise等同步代码执行完毕后，再执行异步代码。
//  4、单独的线程去管理调度代码执行的逻辑，调度整个执行流程。
//
// 进程是计算机分配任务的最小单位

// 宏任务 宿主环境提供的script
// 微任务 语言本身 promise.then()


// 宏任务： ui渲染 网络请求 script脚本 setTimeout setImmediate（ie） messageChannel  requestAnimationFrame
// 微任务：promise.then()  mutationObserver(监听dom变化的）process.nextTick   queueMicrotask
