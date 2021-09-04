const http = require('http');
const fs = require('fs').promises
const {createReadStream, readFileSync} = require('fs')
const path = require('path');
const url = require('url');
const mime = require('mime')
const crypto = require('crypto')
const directory = 'public'
// 协商缓存: 我希望超过强制缓存的时间后，文件没有变化，对比、协商后，继续走缓存
// Etag 指纹。给文件生成一个md5戳。
const server = http.createServer(async (req, res) => {
    let {pathname} = url.parse(req.url, true);
    console.count(pathname)
    res.setHeader('Cache-Control', ' no-cache');
    let filepath = path.join(__dirname, directory, pathname)
    try {
        let stat = await fs.stat(filepath)
        if (stat.isFile()) {
            res.setHeader('Content-Type', mime.getType(filepath) + ';charset=utf-8')

            // 修改时间一样的话再进行一次Etag标志判断
            // 简单的etag，一般不会读整个文件的。读取整个文件的性能会很差
            // etag生成策略：文件大小 + 部位文件内容 + 文件修改时间
            const etag = crypto.createHash('md5').update(readFileSync(filepath, 'utf8')).digest('base64')
            const ifNoneMatch = req.headers['if-none-match']
            if (etag === ifNoneMatch) {
                res.statusCode = 304
                res.end()
            } else {
                res.setHeader('Etag', etag)
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
