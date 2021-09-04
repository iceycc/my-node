const http = require('http');
const url = require('url');
// 路由结构
let routes = [
    {
        path: '*',
        method: "all",
        handler(req, res) {
            res.end(`Cannot find ${req.method} ${req.url}`)
        }
    }
]

function createApplication() {
    return {
        get(path, handler) {
            routes.push({
                path,
                method: "get",
                handler
            })
        },
        listen(...args) {
            // 循环路由匹配
            const server = http.createServer((req, res) => {
                let {pathname} = url.parse(req.url, true);
                let reqMethod = req.method.toLowerCase();
                for (let i = 1; i < routes.length; i++) {
                    let {path, method, handler} = routes[i]
                    if (path === pathname && reqMethod === method) {
                        return handler(req, res)
                    }
                }
                routes[0].handler(req, res)
            })
            server.listen(...args)
        },
        all(path, handler) {

        }
    }
}

module.exports = createApplication
