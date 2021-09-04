const Koa = require('./koa');
const app = new Koa();// 是一个类
// ctx是koa封装的上下文
// req、res是原生的，request、response是koa封装的
app.use(function (ctx) {
    Object.keys(ctx).forEach(item=>console.log(item))
    //ctx上的属性： request response app req res originalUrl state
    // req、res是原生http的，
    // request、response是koa封装的；
    // 并且request和response上的参数属性都直接代理到了ctx上，可以直接ctx.xxx访问
    // 例如path属性
    console.log(ctx.req.path) // undefined 原生req是没有path的。
    console.log(ctx.request.path) // koa自己实现的request上有path
    console.log(ctx.path) // 直接访问ctx上的属性其实是代理到request上到属性，将request上的方法参数代理到了ctx上了，实际是request上的path

    // ctx.res.end('原生的')
    ctx.body = 'koa的'
    // ctx.response.body = 'koa的'
    // 发送错误
    // throw new Error('报错了')
})

app.on('error', (err,ctx) => {
    // 捕获的功能
    // koa基于promise 用发布订阅
    console.log(err)
    ctx.res.end('报错了')
})
app.listen(3000, () => console.log(`start in \r\nhttp://localhost:3000 \r\nhttp://a.test.com:3000 \r\nhttp://b.test.com:3000`))

