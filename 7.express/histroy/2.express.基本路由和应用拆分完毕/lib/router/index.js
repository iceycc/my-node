const url = require('url');
// 解藕路由和应用
// 外部不能直接修改内部的方法，可以通过暴露方法修改

function Router() {
    this.stack = []
}

Router.prototype.get = function (path, ...handlers) {
    this.stack.push({
        path,
        method: 'get',
        handlers
    })
}
Router.prototype.post = function (path, handler) {
    this.stack.push({
        path,
        method: 'post',
        handler
    })
}
Router.prototype.handle = function (req, res, done) {
    let {pathname} = url.parse(req.url, true)
    let reqMethod = req.method.toLowerCase();
    for (let i = 0; i < this.stack.length; i++) {
        let {path, method, handler} = this.stack[i]
        if (pathname === path && reqMethod === method) {
            return handler(req, res)
        }
    }
    done && done() // 找不到的话，让应用去绝对做什么
}

module.exports = Router
