const EventEmitter = require('events')
const http = require('http');

const context = require('./context');
const request = require('./request');
const response = require('./response')

// 1.每个应用的上下文需要独立

class Application extends EventEmitter {
    constructor() {
        super();
        this.middlewares = []
        // - 应用的隔离：不同应用的上下文不同
        // 继承实例prototype上的属性方法
        this.context = Object.create(context)
        this.request = Object.create(request)
        this.response = Object.create(response)
    }

    use(middleware) {
        this.middlewares.push(middleware)
    }

    compose(ctx) {
        let index = 0
        const dispatch = (i) => {
            index = i
            if (index === i) return Promise.reject('next() call multiple times') // 同一个回调多次调用next报错
            if (i === this.middlewares.length) return Promise.resolve()
            let middleware = this.middlewares[i]
            return Promise.resolve(middleware(ctx, () => dispatch(i + 1))) // 防止用户不传promise
        }
        return dispatch(0)
    }

    createContext(req, res) {
        // - 请求隔离：每次请求上下文隔离，,但是同一应用是共享的。
        // 保证用户单次请求新增的属性和方法不污染其他的请求，如需设置全局可以在上层处理。
        // 请求是无状态的。
        let ctx = Object.create(this.context)
        let request = Object.create(this.request)
        let response = Object.create(this.response)
        ctx.request = request
        ctx.response = response
        // 将原生的req、res绑定到ctx上，是为了其他地方直接调用this可以找到原生方法或属性
        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res
        return ctx
    }

    handleRequest(req, res, next) {
        let ctx = this.createContext(req, res)
        ctx.res.statusCode = 404
        this.compose(ctx).then(() => {
            if (ctx.body) {// 用户只有给ctx设置后才会end
                res.end(ctx.body)
            } else {
                res.end('Not Found')
            }
        }).catch(err => {
            this.emit('error', err)
        })
    }

    listen(...args) {
        const sever = http.createServer(this.handleRequest.bind(this))
        sever.listen(...args)
    }

}

module.exports = Application
