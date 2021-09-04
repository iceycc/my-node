const http = require('http');
const fs = require('fs').promises
const {createReadStream} = require('fs')
const path = require('path');
const url = require('url');
const mime = require('mime')
const directory = 'public'
// 协商缓存: 我希望超过强制缓存的时间后，文件没有变化，对比、协商后，继续走缓存
// 1- 服务器设置 Last-Modified ；客户端下次请求会自动携带 If-Modified-Size。
//   问题：
//      时间改变了，但是文件没改变
//      文件变了，但是时间没变，时间精确度为秒，秒级修改
//      CDN资源，不同的CDN，在分发的时候放到不同CDN服务器的时间不一样，导致文件修改时间不一样。
// 2- ETag 指纹。给文件生成一个md5戳。 next-》
const server = http.createServer(async (req, res) => {
    let {pathname} = url.parse(req.url, true);
    console.count(pathname)
    // 首次请求的文件不走强制缓存，但是走协商缓存，因为每次都需要服务器对比一下是否需要缓存。

    //  Cache-Control = no-cache ： 表示每次发送服务器到服务器，但是文件其实是缓存下来了，
    //  需要询问服务器是否用缓存（协商缓存）
    res.setHeader('Cache-Control', ' no-cache');
    let filepath = path.join(__dirname, directory, pathname)
    try {
        let stat = await fs.stat(filepath)
        if (stat.isFile()) {
            res.setHeader('Content-Type', mime.getType(filepath) + ';charset=utf-8')
            // 协商缓存设置Last-Modified最后修改时间:
            // 下次浏览器请求资源会自动携带if-modified-since请求头,然后对比
            let ifModifiedSize = req.headers['if-modified-since']
            let ctime = stat.ctime.toUTCString()
            if (ifModifiedSize === ctime) {
                res.statusCode = 304
                res.end()
            } else {
                res.setHeader('Last-Modified', ctime)
                createReadStream(filepath).pipe(res)
            }

        } else {

        }
    } catch (e) {
        console.log(e)
        res.statusCode = 404
        res.end()
    }
})

server.listen(3002)
