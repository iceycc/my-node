// express对比原生http模块的优点
//  -  完善的路由系统
//  -  req res强大的拓展 比如cookie相关的操作
//  -  中间件拓展
const express = require('./express')

const app = express()
app.get('/home',(req,res)=>{
    // res req对原生的进行了拓展
    res.end('home')
})
app.get('/login',(req,res)=>{
    res.end('login')
})
app.all('*',(req,res)=>{
    res.end('Not Found')
})
app.listen(3000, () => console.log(`start in \r\nhttp://localhost:3000 \r\nhttp://a.test.com:3000 \r\nhttp://b.test.com:3000`))

