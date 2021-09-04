const {pathToRegexp} = require("path-to-regexp");

function Layer(path, handler) {
    this.path = path;
    this.regExp = pathToRegexp(this.path, this.keys = [])
    this.handler = handler
}

Layer.prototype.match = function (pathname) {
    // 中间件匹配
    // 路由匹配：全匹配、动态路由
    if (this.path === pathname) return true
    let r = pathname.match(this.regExp)
    if (r) { // 动态 路由/中间件
        let [, ...matches] = r;
        this.params = this.keys.reduce((pre, next, index) => {
            pre[next.name] = matches[index]
            return pre;
        }, {})
        return true
    }
    if (!this.route) {
        // 中间件
        if (this.path === '/') return true
        return pathname.startsWith(this.path + '/') || pathname.startsWith(this.path + '?')
    }
    return false

}
module.exports = Layer
