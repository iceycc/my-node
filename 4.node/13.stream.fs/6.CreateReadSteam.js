const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

class MyReadSteam extends EventEmitter {
    constructor(path, options={}) {
        super();
        // 1、默认值操作
        this.path = path;
        this.flags = options.flags || 'r'
        this.encoding = options.encoding || null
        this.autoClose = options.autoClose | true
        this.start = options.start || 0
        this.end = options.end || undefined
        this.highWaterMark = options.highWaterMark || 64 * 1024
        this.offset = 0
        this.flowing = false
        // 2、打开文件
        this.open() // 实例化后就打开文件，异步的
        this.on('newListener', (type) => {
            if (type === 'data') {// 监听data的时候直接读取
                this.flowing = true
                this._read() // 真正读读方法
            }
        })
    }

    _read() {
        if (typeof this.fd !== 'number') {
            return this.once('open', () => this._read())
        }
        let buffer = Buffer.alloc(this.highWaterMark)
        let howMachToRead = this.end ? Math.min(this.end - this.offset + 1, this.highWaterMark) : this.highWaterMark;
        fs.read(this.fd, buffer, 0, howMachToRead, this.offset, (err, bytesRead) => {
            if (err) {
                return this.destroy(err)
            }
            // 真实读取的个数
            if (bytesRead > 0) {
                this.emit('data', buffer.slice(0, bytesRead));
                this.offset += bytesRead;
                if (this.flowing) {
                    this._read()
                }
            } else {
                this.emit('end')
                this.destroy()
            }

        })
    }
    pipe(ws){
        this.on('data',(chunk)=>{
            let r = ws.write(chunk)
            if(!r){
                this.pause()
            }
        })
        this.on('end',()=>{
            ws.end()
        })
        ws.on('drain',()=>{
            this.resume()
        })
    }
    pause() {
        this.flowing = false;
    }

    resume() {
        if(!this.flowing){
            this.flowing = true;
            this._read()
        }
    }

    open() {
        fs.open(this.path, this.flags, (err, fd) => {
            if (err) {
                return this.destroy(err)
            }
            this.fd = fd;
            this.emit('open', fd)
            // 源码中打开后立即进行读取操作
        })
    }

    destroy(err) {
        if (err) {
            this.emit('error', err);
        }
        if (typeof this.fd === 'number' && this.autoClose) {
            fs.close(this.fd, () => {
                this.emit('close');
            })
        }
    }
}

module.exports = MyReadSteam
