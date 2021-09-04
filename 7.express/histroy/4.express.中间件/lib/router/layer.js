function Layer(path, handler) {
    this.path = path;
    this.handler = handler
}

Layer.prototype.match = function (pathname) {
    // 中间件匹配
    // 路由匹配：全匹配、动态路由
    // console.log(this.route, this.path, pathname)
    console.log(this.path,pathname,this.path===pathname)
    if (this.path === pathname) return true
    if (!this.route) { // 中间件
        if (this.path === '/') return true
        return pathname.startsWith(this.path + '/') || pathname.startsWith(this.path + '?')
    }
    return false

}
module.exports = Layer
