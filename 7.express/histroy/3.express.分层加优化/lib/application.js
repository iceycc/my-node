const http = require('http');
const Router = require("./router");
const methods = require("methods");

// 路由结构
function Application() {

}

Application.prototype.lazyrouter = function () {
    // 每创建一个app都需要有一个单独的路由系统
    // 先放的先执行
    // 懒加载： 一上来就创建路由没必要，可以在调用get或者listen是再创建
    if (!this._router) this._router = new Router()
}
methods.forEach(method => {
    Application.prototype[method] = function (path, ...handlers) {
        this.lazyrouter()
        this._router[method](path, handlers)
        return this
    }
})
Application.prototype.all = function (req, res) {

}
Application.prototype.listen = function (...args) {
    this.lazyrouter()
    const server = http.createServer((req, res) => {
        const done = function () {
            res.end(`Cannot find ${req.method} ${req.url}`)
        }
        this._router.handle(req, res, done)
    })
    server.listen(...args)
}
Application.prototype.route = function (path) {
    return this
}

module.exports = Application
