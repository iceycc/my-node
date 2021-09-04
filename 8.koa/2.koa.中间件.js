const Koa = require('koa');
const app = new Koa();// 是一个类
// ctx是koa封装的上下文
// req、res是原生的，request、response是koa封装的

app.use(async function (ctx, next) {
    console.log(1)
    next()
    console.log(2)
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
// 洋葱模型： 1 3 5 6 4 2
app.listen(3000, () => console.log(`start in \r\nhttp://localhost:3000 \r\nhttp://a.test.com:3000 \r\nhttp://b.test.com:3000`))


