// express对比原生http模块的优点
//  -  完善的路由系统
//  -  req res强大的拓展 比如cookie相关的操作
//  -  中间件拓展
const express = require('./express')

const app = express()
// 场景1 同一个方法路径有多个回调函数
// ['/'] -- [get,get,get]
// ['/'] -- [get]
app.get('/', (req, res, next) => {
    // 多个功能（可能是异步）放一个函数会比较冗余
    // 功能1 功能2 功能3
    // next
    console.log(1)
    next() // 决定了是否向下执行
    console.log(4)
}, (req, res, next) => {
    console.log(2)
    next()
    console.log(5)
}, (req, res, next) => {
    console.log(3)
    next()
    console.log(6)
})
app.get('/', (req, res) => {
    console.log('ok')
    res.end('ok')
})
// 洋葱模型-- 从里外到里再到外
// 1 2 3 ok 6 5 4


// 场景二 同一个路径对应不同的请求方法
// 一个路径对应多个方法
// 为了restful，不常用。
// 两层栈。路径栈，然后每个路径会再对应一层方法
// ['/'], -- [get,post,delete]
app.route('/')
    .get((req, res) => {
    })
    .post((req, res) => {
    })


app.listen(3000, () => console.log(`start in \r\nhttp://localhost:3000 \r\nhttp://a.test.com:3000 \r\nhttp://b.test.com:3000`))

