// 在浏览器缓存过程中，服务器主要功能是告诉浏览器要不要使用他的缓存
const http = require('http');
const fs = require('fs').promises
const {createReadStream} = require('fs')
const path = require('path');
const url = require('url');
const mime = require('mime')
const directory = 'public'
// 浏览器会将访问过的资源缓存起来。
// 我希望引用的资源没有变化的情况，就使用默认的浏览器缓存就好了
// 浏览器network有个disable cache关掉


const server = http.createServer(async (req, res) => {
    let {pathname} = url.parse(req.url, true);
    console.count(pathname)
    // 1 ）强制缓存
    // 引用的资源会被缓存，
    // 强制缓存只会对对引用资源生效，对首个直接访问对资源文件无效，比如index.html。
    // 告诉浏览器30s别再找我了
    // 风险会导致服务器文件变化了，但是还是缓存
    // Cache-Control: max-age=30
    //  no-cache ： 表示每次发送服务器到服务器，但是文件其实是缓存下来了，需要询问服务器是用缓存（协商缓存）
    //  no-store ： 不缓存，浏览器直接不存储资源
    res.setHeader('Cache-Control', 'max-age=30');
    // 兼容低版本: 访问后到几点别来找我了
    res.setHeader('Expires', new Date(Date.now() + 30 * 1000).toUTCString())
    // 2) 协商缓存我希望超过强制缓存的时间后，文件没有变化，对比、协商后，继续走缓存
    // next->

    let filepath = path.join(__dirname, directory, pathname)

    try {
        let stat = await fs.stat(filepath)
        if (stat.isFile()) {
            res.setHeader('Content-Type', mime.getType(filepath) + ';charset=utf-8')
            createReadStream(filepath).pipe(res)
        } else {

        }
    } catch (e) {
        console.log(e)
        res.statusCode = 404
        res.end()
    }
})

server.listen(3001)
