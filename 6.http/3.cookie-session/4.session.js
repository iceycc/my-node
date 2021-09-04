const http = require("http");
const url = require("url");
const uuid = require('uuid');
const {cookieWarp} = require('./cookie')
// 第一次客户端请求，服务端给客户端设置一个唯一的key的cookie凭证，不会存敏感信息；并且客户端每次携带这个凭证，服务端可以根据这个凭证找到对应的用户信息。
const session = {}; // 存在内存每次服务器重启，持久化的话可以放到数据库，redis 等
const server = http.createServer((req, res) => {
    cookieWarp(req, res)
    let {pathname} = url.parse(req.url, true)
    const CardName = 'connect.sid';
    if (pathname === '/card') {
        let currentCardId = req.getCookie(CardName)
        res.setHeader('Content-Type', 'text/text;charset=utf-8')
        if (currentCardId && session[currentCardId]) {
            // 客户端待凭证，且服务端有该凭证对应的信息
            session[currentCardId]--
            res.end(`还剩：${session[currentCardId]}元`)
        } else {
            let cardId = uuid.v4()
            session[cardId] = 100
            res.setCookie(CardName, cardId, {httpOnly: true})
            res.end('第一次来，充值' + session[cardId] + '元')
        }
    } else {
        res.end('NOT FOUND')

    }
})
server.listen(3000, () => console.log(`start in \r\nhttp://localhost:3000 \r\nhttp://a.test.com:3000 \r\nhttp://b.test.com:3000`))

// cookie被盗，csrf
