// 使构造函数即支持new有支持函数执行创建实例。
function Router() {
    this.stack = []
    if (!new.target) {
        return new Router()
    }
}

Router.prototype.get = function (data) {
    console.log('get', data)
}

let r = Router()
r.get('r')
let r1 = new Router()
r1.get('r1')

// -------------------------------------

function Router2() {
    let route = function () {
    }
    route.stack = []
    route.__proto__ = proto
    // 无论new还是call都会返回一个函数。。此函数就没有原来的this了。
    // 如果类返回一个引用类型，当前的返回值会被作为new时返回的实例。
    return route
}

let proto = {}
proto.get = function (data) {
    console.log('get', data)
}

let r2 = Router2()
r2.get('r2')
let r3 = new Router2()
r2.get('r3')

