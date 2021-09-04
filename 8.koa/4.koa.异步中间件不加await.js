
const Koa = require('koa');
const app = new Koa();// 是一个类

app.use(function (ctx, next) {
    console.log(1)
    setTimeout(()=>{
        console.log('ok1')
        next() // 这么直接执行不管事呀
    },3000)
    console.log(2)
    // 1 2 1.1 顺序是这样的了
})

app.use(async function (ctx, next) {
    console.log(3)
    next()
    console.log(4)
})

app.use(async function (ctx, next) {
    console.log(5)
    next()
    console.log(6)
})
// 1 3 2 5 4 6

app.listen(3000, () => console.log(`start in \r\nhttp://localhost:3000 \r\nhttp://a.test.com:3000 \r\nhttp://b.test.com:3000`))

