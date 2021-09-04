const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs').promises; // 获取promise方法
const {createReadStream, createWriteStream, readFileSync} = require('fs');
const chalk = require('chalk');
const crypto = require('crypto');

// ---------------------------------
const mime = require('mime');
const ejs = require('./ejs');

// (async function (){
//     let r = await ejs.renderFile(
//         path.resolve(__dirname,'template.html'),
//         {name:'zf',age:11,arr:[1,2,3]}
//     );
//     console.log(r)
// })()

class Server {
    constructor(options = {}) {
        this.port = options.port;
        this.directory = options.directory;
        this.cache = options.cache;
    }

    async handleRequest(req, res) {
        // 解析路径
        let {pathname} = url.parse(req.url, true)
        pathname = decodeURIComponent(pathname) // 解码
        // 列出所有文件夹
        let requestUrl = path.join(this.directory, pathname) // 路径开始带/的不要用resolve，会会到根目录
        console.log(requestUrl);
        try {
            const statObj = await fs.stat(requestUrl)
            if (statObj.isDirectory()) {
                // 目录
                // 读
                let dirs = await fs.readdir(requestUrl)
                const content = await ejs.renderFile(path.join(__dirname, 'template.html'), {
                    dirs: dirs.map(dir => {
                        return {
                            name: dir,
                            pathname: path.join(pathname, dir),
                            access: '', // 文件权限等
                            fileType: '',  //文件类型
                        }
                    })
                })
                res.setHeader('Content-Type', 'text/html;charset=utf-8');
                res.end(content)
            } else {
                // 文件
                this.sendFile(requestUrl, req, res, statObj)
            }
            // res.end(JSON.stringify(statObj))
        } catch (e) {
            this.sendError(e, req, res)
        }

    }

    sendFile(requestUrl, req, res, statObj) {
        if (this.cache && this.cacheFile(requestUrl, req, res, statObj)) {
            res.statusCode = 304
            return res.end()
        }
        // css text/css
        // js text/javascript
        // res.setHeader('Content-Type','type/javascript;charset=UTF-8') //
        res.setHeader('Content-Type', `${mime.getType(requestUrl)};charset=utf-8`)
        createReadStream(requestUrl).pipe(res)
    }

    sendError(e, req, res) {
        res.statusCode = 404;
        res.end('Not Found')
    }

    cacheFile(requestUrl, req, res, statObj) {
        // 缓存策略
        // 设置强制缓存
        res.setHeader('Cache-Control', 'max-age=10')
        // 设置last-modify
        const lastModified = statObj.ctime.toUTCString()
        const Etag = crypto.createHash('md5').update(readFileSync(requestUrl, 'utf8')).digest('base64')
        res.setHeader('Last-Modified', lastModified)
        res.setHeader('Etag', Etag)
        let ifModifiedSize = req.headers['if-modified-since']
        let ifNoneModified = req.headers['if-none-match']
        if (lastModified !== ifModifiedSize) {
            return false
        }
        if (Etag !== ifNoneModified) {
            return false
        }
        return true
    }

    start() {
        // async await
        // const server = http.createServer(() => this.handleRequest())
        const server = http.createServer(this.handleRequest.bind(this))
        server.listen(this.port, () => {
            console.log(`${chalk.yellow('Starting up http-server, serving')}`);
            console.log(`  http://127.0.0.1:${chalk.green(this.port)}`)
        })
    }
}

module.exports = Server;

// http-header的应用 缓存 代理 多语言... range...
// 先express
// koa
