const Layer = require("./layer");
const methods = require("methods");

function Route() {
    this.stack = [];
    this.methods = {} // 为了优化，表示里面有哪些方法
}

methods.forEach(method => {
    Route.prototype[method] = function (handlers) { // handles用户传人的真实的回调，可能是多个
        handlers.forEach(handler => {
            // 内层的layer放的是用户真实的回调、
            // 不需要考虑路径，上一层已经匹配过了。这一层只需要考虑方法
            const layer = new Layer('', handler)
            layer.method = method
            this.methods[method] = true // 标记有该方法
            this.stack.push(layer) //  存储的用户的真实的回调
        })

    }
})
Route.prototype.dispatch = function (req, res, out) {
    let reqMethod = req.method.toLowerCase();
    // 让用户定义的函数依次执行，
    let idx = 0;
    const next = () => {
        if (idx >= this.stack.length) return out()
        let layer = this.stack[idx++];
        if (reqMethod === layer.method) {
            layer.handler(req, res, next)
            // 这个是用户的真实的回调了
            // 用户直接掉next就会执行下一个逻辑了。
        } else {
            next()
        }
    }
    next()
}
module.exports = Route
