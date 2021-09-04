const EventEmitter = require('events')
const fs = require('fs');
const Queue = require('./Queue/queue');
// ws.write() ws.end()
class WriteStream extends EventEmitter {
    constructor(path, options = {}) {
        super()
        this.path = path
        this.flags = options.flags || 'w'
        this.encoding = options.flags || 'utf8'
        this.mode = options.mode || 0o666
        this.start = options.start || 0
        this.highWaterMark = options.highWaterMark || 16 * 1024
        this.autoClose = options.autoClose
        this.writing = false // 默认不是正在写入，第一次调用write的时候需要执行fs.write方法
        this.len = 0 // 写入的个数，写入后需要进行比较
        this.needDrain = false // 是否触发drain事件
        this.offset = 0
        this.cache = new Queue(); // 链表实现的队列优化
        this.open();
    }

    open() {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if (err) return this.destroy(err);
            this.fd = fd
            this.emit('open', fd)
        })
    }

    write(chunk, encoding = this.encoding, cb = () => {
    }) {
        // chunk： 汉字/字符串 -> Buffer
        // 统一成Buffer
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
        this.len += chunk.length
        let result = this.len < this.highWaterMark // 是否达到预期
        this.needDrain = !result;
        const clearBuffer = () => {
            this.clearBuffer()
            cb()
        }
        if (this.writing) {
            this.cache.push({
                chunk,
                encoding,
                cb: clearBuffer
            })
        } else {
            this.writing = true;
            this._write(chunk, encoding, clearBuffer)
        }
        return result;
    }

    _write(chunk, encoding, cb) {
        // 绑定事件监听open
        if (typeof this.fd !== 'number') {
            return this.once('open', () => {
                this._write(chunk, encoding, cb)
            })
        }
        fs.write(this.fd, chunk, 0, chunk.length, this.offset, (err, written) => {
            if (err) return this.destroy(err)
            this.len -= written; // 写入的数量
            this.offset += written; //每次更改偏移量减少缓存数量
            cb()
        })
    }

    clearBuffer() {
        // 清空缓存
        let data = this.cache.shift()
        if (data) {
            this._write(data.chunk, data.encoding, data.cb)
        } else {
            this.writing = false;
            if (this.needDrain) {
                this.needDrain = false
                this.emit('drain')
            }
        }
    }

    end(chunk) {
        // this._write(chunk, this.encoding)
        this.destroy()
    }

    destroy(err) {
        if (err) {
            this.emit('error', err)
        }
        if (typeof this.fd === 'number' && this.autoClose) {
            this.emit('close')
        }
    }
}

module.exports = WriteStream
