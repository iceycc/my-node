// 发布订阅模式 node内置了这个模块
// 发布订阅模式解决了什么问题：
// 1 异步通讯
// 2 代码解藕

// vue的$on $emit


// 自己开发可以继承events
// events: 提供的方法:on emit once off
// const EventEmitter = require('events')
const EventEmitter = require('./events')
const util = require('util')

function Girl(...args) {
}
// 原型继承的几种方法
// 1
// node初期版本用的这个
// Girl.prototype.__proto__ = EventEmitter.prototype
// 2
// Girl.prototype = Object.create(EventEmitter.prototype)
// 3 setPrototypeOf
// util.inherits(Girl,EventEmitter)
Object.setPrototypeOf(Girl.prototype, EventEmitter.prototype)
// 4 es6 class extends继承
// class Girl extends EventEmitter{}

let girl = new Girl()

// 绑定就触发
let pending = false; // 批处理, 一次事件环内只触发一次，防抖
girl.on('newListener',type=>{
    if(pending) return;
    pending = true;
    process.nextTick(() => {
        pending = false;
        console.log('newListener', type)
    })
})

girl.on('newListener',type=>{
    process.nextTick(() => {
        console.log('newListener2', type)
    })
})

girl.on('失恋', (...args) => {
    // console.log(...arguments)
    console.log('哭', ...args)
})
function eat() {
    console.log('吃')
}
// 等价于先绑定on，触发on后再off
girl.once('失恋',eat)
girl.on('失恋', () => {
    console.log('逛街')
})

girl.off('失恋',eat)
girl.emit('失恋', 1, 2, 3)
girl.emit('失恋', 1, 2, 3)

