const express = require('./express')
const app = express()
// 子路由
// express.Router() 会创建多个路由列表
// 然后注册到app.use('/xxx') 上
//路由user模块
let userRouter = express.Router()
// curl -v -X GET http://localhost:3000/user/detail/1
console.log('-------------------')
userRouter.get('/detail/:id', (req, res) => {
    res.end('one: ' + req.params.id)
})
//  curl -v -X GET http://localhost:3000/user/list
userRouter.get('/list', (req, res) => {
    res.end(JSON.stringify({list: [{name: 'user1', age: '15'}]}))
})

// //路由post模块
let postRouter = express.Router()
// curl -v -X GET http://localhost:3000/post/detail/1
postRouter.get('/detail/:id', (req, res) => {
    res.end('one post: ' + req.params.id)
})
// curl -v -X GET http://localhost:3000/post/list
postRouter.get('/list', (req, res) => {
    res.end(JSON.stringify({list: [{title: 'post1', content: '15'}]}))
})
// /post/list/one 子路由的子路由
// curl -v -X GET http://localhost:3000/post/list/one
const listRouter = express.Router()
listRouter.get('/one', (req, res) => {
    res.end('success list/one')
})
postRouter.use('/list', listRouter)


// 路由统一管理
app.use('/user', userRouter)
app.use('/post', postRouter)


app.listen(3000, () => console.log(`start in \r\nhttp://localhost:3000 \r\nhttp://a.test.com:3000 \r\nhttp://b.test.com:3000`))

