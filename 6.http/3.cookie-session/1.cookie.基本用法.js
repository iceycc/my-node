const http = require("http");
const url = require("url");
// cookie
// key value domain httpOnly expires/maxAge path
// domain 默认只在当前二级域名下设置，设置只能在设置一级域名或者次级域名
// path 限制cookie路径，合理使用可以减少cookie的传人
// maxAge 多少秒后  expires 过期时间
// httpOnly 浏览器不能操作
const server = http.createServer((req, res)=>{
    let {pathname} = url.parse(req.url,true)
    console.log(pathname)
    if(pathname==='/get'){
        let cookie = req.headers['cookie']
        res.end(cookie)
    }
    if(pathname==='/set'){
        let expires = Date.now() + 10 * 1000
        // 此方法不方便呀
        res.setHeader('Set-Cookie',['a=1; domain=.test.com; max-age=20; ',`b=2; expires=${new Date(expires).toUTCString()}`])
        res.end('write ok')
    }
})
// // cookie封装 =》 session =》 jwt实现原理 =》 express => gzip
server.listen(3000,()=> console.log(`start in \r\nhttp://localhost:3000 \r\nhttp://a.test.com:3000 \r\nhttp://b.test.com:3000`))
