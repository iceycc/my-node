const url = require('url');
const methods = require("methods");
// 解藕路由和应用
// 外部不能直接修改内部的方法，可以通过暴露方法修改
const Layer = require("./layer");
const Route = require("./route");


function Router() {
    this.stack = []
}

// 外层的Layer考虑路径，里层的Layer考虑方法。其实用的同一Layer
Router.prototype.route = function (path) {
    // 创建一个Layer 创建一个Route 将handles传递给route
    let route = new Route();
    // 外层的layer放的dispatch
    let layer = new Layer(path, route.dispatch.bind(route)); // 一个路由的layer有一个route属性存储执行方法，并且有个dispatch的方法去调用它们
    // 这个关联目的：可以在layer获取route信息
    layer.route = route; // 路由中的layer都有一个route属性和我没的route关联起来  ["/"] -- [getHandler,getHandler...]
    this.stack.push(layer)
    return route
}
methods.forEach(method => {
    Router.prototype[method] = function (path, handler) {
        let route = this.route(path)
        route.get(handler)
    }
})
Router.prototype.handle = function (req, res, out) {
    let {pathname} = url.parse(req.url, true)
    let reqMethod = req.method
    let ind = 0;
    const next = () => {
        if (ind >= this.stack.length) return out(); // 路由处理不了就 传递给应用层
        let layer = this.stack[ind++];
        if (layer.match(pathname) && layer.route.methods[reqMethod]) {
            layer.handler(req, res, next)
            // layer.handler 就是route的dispatch。
            // 传人next传递进去为了回溯出来，可以让路由层可以扫描下一层。
        } else {
            // 如果路径不匹配就执行下一层逻辑
            next()
        }
    }

    next()

}

module.exports = Router
