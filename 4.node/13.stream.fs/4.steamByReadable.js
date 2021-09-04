// 文件流可读流 是基于steam模块的Readable
//
const fs = require('fs');

const {Readable} = require('stream'); // 可读流接口
const path = require('path');

// 我要自己实现一个可读流
class MyReadStream extends Readable {
    _read() {
        let buffer = Buffer.alloc(3);
        fs.open(path.resolve(__dirname, 'a.txt'), 'r', (err, fd) => {
            fs.read(fd, buffer, 0, 3, 0, (err, byteRead) => {
                this.push(buffer); // 内部会调用触发 emit('data',buffer)事件,将数据发射出来
                this.push(null) // 此时如果push一个空值会触发end
            })
        })

    }
}

let myReadStream = new MyReadStream({})

myReadStream.on('data', (chunk) => {
    // 当用户监听了data事件，会触发Readable.read方法，父类会调用子类自己实现的_read方法
    // 不停的触发read事件，
    console.log('chunk',chunk)
})

myReadStream.on('end', () => {
    console.log('end')
})
