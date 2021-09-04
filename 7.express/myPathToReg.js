const {pathToRegexp} = require("path-to-regexp");
// curl -v -X GET http://localhost:3000/user/wby/123/get
// 路径 必须以/user/随意/随意/get    /user/1/2/get  => {name:,id:2}  => req.paramss
let textUrl = 'http://localhost:3000/user/wby/123/get'
let routePath = '/user/:name/:id/get'
const params = parseParams(routePath, textUrl)
console.log(params)

// https://www.npmjs.com/package/path-to-regexp
let keys = []
const reg = pathToRegexp('/user/:id/:age/zf', keys);
console.log(reg, keys)

function parseParams(route, url) {
    let keys = []
    let regexStr = route.replace(/:([^\/])+/g, function (value) {
        keys.push(value.substring(1))
        return '([^/]+)';
    })

    // console.log(regexStr) // ==> /user/([^/]+)/([^/]+)/get
    // console.log(keys) // =>  [ 'name', 'id' ]
    let values = url.match(regexStr).splice(1, keys.length)
    // console.log(values) // [ 'wby', '123' ]
    return keys.reduce((pre, next, index) => {
        pre[next] = values[index]
        return pre
    }, {})
}
