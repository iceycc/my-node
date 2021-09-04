const Koa = require('./koa');
const app = new Koa();// 是一个类
// ctx是koa封装的上下文
// req、res是原生的，request、response是koa封装的
// 多个中间件 compose
// 异步处理 // koa中next前面必须要加await，koa中所有异步必须是promise
function sleep(n) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve()
        }, n * 1000)
    })
}

app.use(async function (ctx, next) {
    console.log(1)
    await sleep(1) // 等待
    await next()
    console.log(2)
})
app.use(async function (ctx, next) {
    console.log(3)
    await sleep(1)
    await next()
    console.log(4)
})

app.use(async function (ctx, next) {
    console.log(5)
    await sleep(1)
    await next()
    console.log(6)
})
// next 1 3 5 6 4 2
// next代表下一次执行，如果不加await就不会等待下次执行完执行
// return也会自动包装称promise，但是不会再执行后面逻辑了； await也会返回的话执行完会执行后面，执行完还会执行后面


app.on('error', (err,ctx) => {
    console.log(err)
    ctx.res.end('报错了')
})
app.listen(3000, () => console.log(`start in \r\nhttp://localhost:3000 \r\nhttp://a.test.com:3000 \r\nhttp://b.test.com:3000`))

