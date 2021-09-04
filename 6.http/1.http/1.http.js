const http = require('http');

// 解析url
const testUrl = 'http://username:password@www.baidu.com:80/index.html?line=9#hash'
// 1 url.parse(...)
const url = require('url');
// console.log(url.parse(testUrl, true)) // 该方法废弃，不建议使用
// ==>
// Url {
//         protocol: 'http:',
//         slashes: true,
//         auth: 'username:password',
//         host: 'www.baidu.com:80',
//         port: '80',
//         hostname: 'www.baidu.com',
//         hash: '#hash',
//         search: '?line=9',
//         query: [Object: null prototype] { line: '9' },
//         pathname: '/index.html',
//         path: '/index.html?line=9',
//         href: 'http://username:password@www.baidu.com:80/index.html?line=9#hash'
// }

// 2 new URL(...) 不能解析不标准的url
// const myUrl = new URL(testUrl)
// console.log(myUrl)
// ==>
// URL {
//         href: 'http://username:password@www.baidu.com/index.html?line=9#hash',
//         origin: 'http://www.baidu.com',
//         protocol: 'http:',
//         username: 'username',
//         password: 'password',
//         host: 'www.baidu.com',
//         hostname: 'www.baidu.com',
//         port: '8080', // 80的时候会默认为空
//         pathname: '/index.html',
//         search: '?line=9',
//         searchParams: URLSearchParams { 'line' => '9' },
//         hash: '#hash'
// }

// 服务端代码需要重新启动
// 进程守护：开发时可以使用一些代码变化实现自动重启：supervisor nodemon  pm2
let server = http.createServer(function (req, res) {
    //  内部还是用eventEmitter，事件发布订阅
    // request 客户端请求
    // response 服务端响应a

    // node是单线程。
    // const {pathname, query} = url.parse(req.url, true)
    // console.log(pathname, query)
    // if (pathname === '/sum') {
    //     let sum = 0;
    //     for (let i = 0; i < 1000000000000; i++) { // 这种大的算法会阻塞其他正常请求。。实际开发需要子进程 进行ipc通讯来实现。
    //         sum += 1
    //     }
    //     res.end(sum + '')
    // }else{
    //     res.end('ok')
    // }

    // 请求==================================================================================
    // req是一个可读流
    // 请求头相关的内容：请求行、请求头、请求体
    // 请求行----------------
    // GET /sum?a=1 HTTP/1.1
    console.log(req.method);
    console.log(req.url);
    console.log(req.httpVersion)

    // 请求头----------------
    console.log(req.headers)
    // 请求体----------------
    // curl -v -X POST -d "a=1&b=2" http://localhost:3000/sum?name=wby#hash
    req.on('data', (chunk) => {
        console.log('data', chunk)
    })
    req.on('end', () => {
        // 无论请求体是否有都会触发，push null
        // 读取完毕会触发
        console.log('end')
    })

    // 响应 ==================================================================================
    // res是响应流
    // 响应行
    // HTTP/1.1 600 OKya
    res.statusCode = 600 // 可以自定义
    res.statusMessage = 'OK' //可以自定义
    // 响应头
    res.setHeader('Auth', 'xxxx') // 自定义响应头
    // res.setHeader('Content-Type', 'text/html;charset=gbk')
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    // 响应体
    res.write('你好，Hello') // 注意上面响应头的ContentType，如果设置
    res.end('\r\n 结束')

})
server.on('request', () => {
    console.log('request');
})
let port = 3000
server.on('error', (err) => {
    console.log(`错误码:${err.errno}, ${err.port}端口被占用`);
    if (err.errno === 'EADDRINUSE') {
        port = err.port + 1
        server.listen(port)
    }
})
server.listen(port, () => {
    console.log(`Server start  in http://localhost:${port}`)
})

//  curl -v  http://localhost:3000/get?name=wby#hash
