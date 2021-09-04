const http = require("http");
const url = require("url");
const querystring = require('querystring')
// 封装
// =》 res.setCookie req.getCookie

// querystring.parse(str, [sep], [eq], [options])
// str                                         欲转换的字符串
// sep                                       设置分隔符，默认为 ‘&'
// eq                                         设置赋值符，默认为 ‘='
// [options]  maxKeys             可接受字符串的最大长度，默认为1000
// console.log(querystring.parse('a=1&b=2')) // 默认以&为分割符合 ，=为赋值符号 key:value
// console.log(querystring.parse('a-1; b-2','; ','-')) //  第二个参数可以设置分割符,第三个参数设置赋值符

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

    req.getCookie = function (key) {
        let cookie = querystring.parse(req.headers['cookie'], '; ')
        return cookie[key]
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

        cookies.push(`${key}=${value}; ${optArgs.join('; ')}`)
        res.setHeader('Set-Cookie', cookies)
    }
    let {pathname} = url.parse(req.url, true)
    if (pathname === '/get') {
        let age = req.getCookie('age')
        console.log(age)
        res.end(age)
    }
    if (pathname === '/set') {
        let expires = Date.now() + 30 * 1000
        res.setCookie('name', 'wby', {expires: expires})
        res.setCookie('age', 33, {expires: expires})
        // 此方法不方便呀
        res.end('write ok')
    }

    res.end('NOT FOUND')
})
// // cookie封装 =》 session =》 jwt实现原理 =》 express => gzip
server.listen(3000, () => console.log(`start in \r\nhttp://localhost:3000 \r\nhttp://a.test.com:3000 \r\nhttp://b.test.com:3000`))
