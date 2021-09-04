const express = require('./express')
const url = require("url");
const querystring = require("querystring");
const app = express()
// 中间件的作用：app.use
// 1- 拦截： 权限
// 2- 拓展参数
// 中间件一般写在路由前面

// 中间件回调的next外层的 ；路由回调的next 内层的

// 中间件不匹配方法，但是内部可以自己实现
// 封装res.end中间件
app.use(function (req, res, next) {
    res.send = function (data) {// 此方法express内置的
        if (typeof data === 'object') {
            res.setHeader('content-type', 'application/json;charset=utf-8')
            res.end(JSON.stringify(data))
        } else {
            res.end(data)
        }
    }
    res.sendSuccess = function (data) {
        res.send({
            code: 200,
            message: 'success',
            data
        })
    }
    res.sendFail = function (data) {
        res.send({
            code: 300,
            message: 'fail',
            data
        })
    }
    next()
})
app.use((req, res, next) => {
    let arr = []
    req.on('data', (chunk) => {
        arr.push(chunk)
    })
    req.on('end', () => {
        req.body = Buffer.concat(arr).toString()
        // todo: 可以根据content-type类型分别处理body参数
        // let result = Buffer.concat(arr).toString()
        // req.body = querystring.parse(result)
        next()
    })
})
app.get('/', (req, res) => {
    res.end('2 get ok')
})

// 权限中间件
app.use('/user', function (req, res, next) {
    let {query} = url.parse(req.url, true)
    console.log(query)
    if (query && query.token === 'admin') {
        console.log('token ok next')
        next()
    } else {
        res.sendFail('没token,或token失效')
    }
})
app.post('/user', function (req, res) {
    // curl -v -X POST -d 'a=1&b=2' http://localhost:3000/user?token=admin
    res.send(req.body)
})

app.get('/user', (req, res, next) => {
    // curl -v -X GET http://localhost:3000/user?token=admin
    console.log('user get ok')
    // res.end({name:'wby',age:'22'}) // end必须返回一个buffer或者json
    // res.send({name: 'wby', age: '22'})// express内置了send中间件,自动转换对象为JSON
    if (Math.random() > 0.5) {
        res.sendSuccess({name: 'wby', age: '22'})
    } else {
        next('请求出错了')
    }
})

// 错误处理中间件 放最后
// 特点：函数的参数是四个
app.use((err, req, res, next) => {
    //
    console.log('use err')
    res.sendFail(err)
})
app.listen(3000, () => console.log(`start in \r\nhttp://localhost:3000 \r\nhttp://a.test.com:3000 \r\nhttp://b.test.com:3000`))

