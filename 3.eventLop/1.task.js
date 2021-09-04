setTimeout(() => { // 宏任务
    console.log('ok1')
}, 1000)

setTimeout(() => { // 宏任务
    console.log('ok2')
}, 500)

Promise.resolve().then(() => {
    console.log('Promise then 1')
})

function a() {
    function b() {
        function c() {
            console.log('c')
        }
        c()
    }
    b()
}
a()
//
let i = 100000
while (i--){ // 同步代码卡住就不会走异步
    // console.log(i)
}

// 两个任务队列：
// 宏任务 [] 碰到宏任务不一定，如果是定时器或者ajax或者监听事件，需要等定时器执行完或者异步任务处理完再将任务加入宏任务队列。有定时器线程、网络请求线程处理这种延迟任务。
// 微任务 [] 碰到微任务立马放入微任务队列中

// 主进程同步任务执行完后(script脚本）
// --> 清空微任务队列
// --> UI渲染进程（合适的时机调用，比如同时操作多个dom，有个调度机制）
// --> 宏任务队列，宏任务是一个个取出来的，先放入第一个宏任务(可能里面还嵌套宏任务/微任务，会再次依次清空微任务和宏任务)，依次执行
