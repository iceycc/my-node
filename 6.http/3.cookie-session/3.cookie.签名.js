const http = require("http");
const url = require("url");
const querystring = require('querystring')
// 签名是为了防止数据被篡改，铭文展示
// cookie始终还是存在客户端的，还是不安全
// cookie不存敏感信息，给cookie增加签名，防止被篡改，被篡改就失效
// 如何签名 加sign
// cookie BFF中间层转发可能会丢失
const crypto = require("crypto");
const key = 'wby' // 加盐 可以用openssl生成一个1024的密钥。
// 摘要算法，无法反推，只是相同的值根据相同的加盐算法，得到的值是一样的，
function signed(value) {
    return crypto.createHmac('sha256', key).update(value.toString()).digest('base64')
}

const server = http.createServer((req, res) => {
    // req.getCookie = function (key) {
    //     let cookie = req.headers['cookie']
    //     let coObj = cookie.split('; ').reduce((pre, next) => {
    //         let [key, value] = next.split('=');
    //         pre[key] = value
    //         return pre
    //     }, {})
    //     return coObj[key]
    // }

    req.getCookie = function (key,options={}) {
        let cookie = querystring.parse(req.headers['cookie'], '; ')
        if(options.sign){ // 是否需要校验签名
            let [value,sign] = cookie[key].split('.')
            if(signed(value) === sign){ // 摘要算法无法反推，但是相同的值摘要结果是一样的 。jwt也是这个原理
                return value
            }else{
                return '';
            }
        }else{
            return cookie[key] ? cookie[key].split('.')[0] : ''
        }
    }

    let cookies = []
    res.setCookie = function (key, value, options = {}) {
        let optArgs = []
        if (options.maxAge) {
            optArgs.push('max-age', options.maxAge)
        }
        if (options.expires) {
            optArgs.push('expires', options.expires)
        }
        if (options.path) {
            optArgs.push('path', options.path)
        }
        if (options.httpOnly) {
            optArgs.push('httpOnly', options.httpOnly)
        }
        if (options.sign) {
            value = value + '.' + signed(value)
        }
        let cookieValue = `${key}=${value}`
        cookies.push(`${cookieValue}; ${optArgs.join('; ')}`)
        res.setHeader('Set-Cookie', cookies)
    }
    let {pathname} = url.parse(req.url, true)
    if (pathname === '/get') {
        let name = req.getCookie('name')
        res.end(name)
    }
    if (pathname === '/set') {
        let expires = Date.now() + 300 * 1000
        res.setCookie('name', 'wby', {expires: expires,sign:true})
        res.setCookie('age', 33, {expires: expires})
        // 此方法不方便呀
        res.end('write ok')
    }

    res.end('NOT FOUND')
})
// // cookie封装 =》 session =》 jwt实现原理 =》 express => gzip
server.listen(3000, () => console.log(`start in \r\nhttp://localhost:3000 \r\nhttp://a.test.com:3000 \r\nhttp://b.test.com:3000`))
