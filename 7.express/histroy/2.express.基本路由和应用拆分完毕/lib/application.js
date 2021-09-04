const http = require('http');
const url = require('url');
const Router = require("./router");

// 路由结构
function Application() {
    // 每创建一个app都需要有一个单独的路由系统
    // 先放的先执行
    this._router = new Router()
}

Application.prototype.get = function (path, handler) {
    this._router.get(path, handler)
}
Application.prototype.post = function (req, res) {

}
Application.prototype.all = function (req, res) {

}

Application.prototype.listen = function (...args) {
    const server = http.createServer((req, res) => {
        const done = function () {
            res.end(`Cannot find ${req.method} ${req.url}`)
        }
        this._router.handle(req, res, done)
    })
    server.listen(...args)
}

module.exports = Application
