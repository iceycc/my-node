const querystring = require('querystring')
const crypto = require("crypto");
const key = 'wby'
function signed(value) {
    return crypto.createHmac('sha256', key).update(value.toString()).digest('base64')
}
exports.cookieWarp = function cookieWarp(req,res){
    req.getCookie = function (key, options = {}) {
        let cookie = querystring.parse(req.headers['cookie'], '; ')
        if (options.sign) { // 是否需要校验签名
            let [value, sign] = cookie[key].split('.')
            if (signed(value) === sign) { // 摘要算法无法反推，但是相同的值摘要结果是一样的 。jwt也是这个原理
                return value
            } else {
                return '';
            }
        } else {
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
}
