## 几个功能：
express是基于回调的

- const app = express()
- 中间件 `app.use('')`
- 一个路径一个方法：`app.get('/user',(req,res,next)=>{next()})`
- 一个路径多个回调：`app.get('/user',(req,res,next)=>{next()},(req,res,next)=>{next()})`
- 一个方法多种请求：`app.get('/',(req,res)=>{}).post('/',(req,res)=>{})`
- `app.listen(port,callback)`
- 错误处理中间件：`app.use(function(err,req,res,next)=>next())`
- 异常处理：
    - promise可以直接catch，但是异步回调处理就不容易了
    - 对于回调永远将第一个参数作为错误参数
