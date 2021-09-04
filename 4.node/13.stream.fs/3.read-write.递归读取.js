const fs = require('fs');
const path =require('path');
// 如何读三个字节写三个字节,边读编写？？

// 异步迭代，函数递归。
// 存在问题：嵌套。如何解决发布订阅解藕
function read(bufferSize = 3) {
    let buffer = Buffer.alloc(bufferSize) // 声明一块内存空间
    let readOffset = 0;
    let writeOffset = 0;
    fs.open(path.resolve(__dirname, 'a.txt'), 'r', (err, fd) => {
        fs.open(path.resolve(__dirname, 'f.txt'), 'w', (err, wfd) => {
            function next() {
                fs.read(fd, buffer, 0, bufferSize, readOffset, function (err, bytesRead) {
                    // 实际读到的个数bytesRead
                    if (bytesRead > 0) {
                        readOffset += bytesRead;
                        fs.write(wfd, buffer, 0, bufferSize, writeOffset, (err, written) => {
                            writeOffset += written;
                            next();
                        })
                    } else {
                        // 释放fd，wfd
                        fs.close(fd, () => {
                        })
                        fs.close(wfd, () => {
                        })
                    }
                })
            }

            next()
        })

    })
}

read(3)
