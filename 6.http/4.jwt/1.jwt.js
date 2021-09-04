// json web token
// 第一次访问服务器，服务器会生成一个token，凭证，基于一定的算法、存储令牌过期时间，还有其他身份信息
// 如果防止别人篡改，sha256加盐，摘要算法
// token如果被盗取怎么办，可以设置过期时间。

// session的缺点：不支持分布式架构，无法横向扩展，只能通过数据库来保存回话数据实现数据共享。持久化层失败会认证失败。
// jwt优点：服务端不会存任何回话数据，即服务器无状态，使其容易扩容
// jwt的部分
// Header头：加密算法类型等
// Payload： 负载和载核
// Signature 签名
// 如果token uri传递 需要 base64转码
// Bearer 规范约定

// 两个包 jwt-simple  jsonwebtoken
const http = require('http');
const url = require('url');
const querystring = require("querystring");
// const jwt = require('jwt-simple')
const jwt = require('./i-jwt') // 自己的jwt
const secret = 'wby'
const server = http.createServer((req, res) => {
    if (req.url === '/login') {
        let arr = []
        req.on('data', (chunk) => {
            arr.push(chunk)
        })
        req.on('end', () => {
            const contentType = req.headers['content-type']
            const content = Buffer.concat(arr).toString()
            let result;
            //  x-www-form-urlencoded ->:
            if (contentType === 'application/x-www-form-urlencoded') {
                result = querystring.parse(content + '');
                if ('admin' === result.username && 'admin' === result.password) {
                    res.setHeader('content-type', 'application/json')
                    res.end(JSON.stringify({
                        message: '登录成功',
                        // token = 头（固定）+ 内容（自定义）+ 密钥
                        token: jwt.encode({
                            exp: new Date(Date.now() + 100 * 1000),
                            username: result.username
                        }, secret)
                    }))

                }
            }

        })
    } else if (req.url === '/check') {
        if (req.headers['authorization']) {
            let [, token] = req.headers['authorization'].split(' ')
            if (token) {
                try {
                    let payload = jwt.decode(token, secret)
                    console.log(payload)// 用户的私密信息最好不要放token，放唯一标识就行
                    let exp = new Date(payload.exp).getTime()
                    if (exp < new Date().getTime()) {
                        res.end('token 过期了')
                    } else {
                        console.log(payload.username)
                        res.end('登录了' + payload.username)
                    }
                } catch (e) {
                    console.log(e)
                    res.end(e.toString())
                }
            }
        }
        res.end('NOT FROM')

    } else {
        res.end('NOT FROM')
    }

})

server.listen(3000, () => console.log(`start in \r\nhttp://localhost:3000 \r\nhttp://a.test.com:3000 \r\nhttp://b.test.com:3000`))

