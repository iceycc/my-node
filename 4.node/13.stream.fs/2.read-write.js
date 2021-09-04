const fs = require('fs');
const path = require('path');

// fs.open fs.read fs.write
// 与fs.readFile fs.writeFile比较，更底层
// r(read) w(write) a(append)  r+(读取问基础文件必须存在） w+（以写为基础，文件不存在也行）等等
// https://nodejs.org/dist/latest-v14.x/docs/api/fs.html#fs_file_system_flags

let buffer = Buffer.alloc(3) // 声明一块内存空间
fs.open(path.resolve(__dirname, 'a.txt'), 'r', (err, fd) => {
    // fd: file descriptor  可以描述我要对这个文件做什么操作

    // fs.read(fd,buffer,offset,length,position)
    // fd 文件描述符、数字类型，累计 从3开始
    // buffer: 读取到哪个buffer（内存）中、
    // offset: 从buffer哪个位置开始写入
    // length：写入几个
    // position: 读取文件的位置 读取偏移量

    // 读：把文件读取写到内存里 先读取3个字节放到到buffer里
    fs.read(fd, buffer, 0, 3, 0, function (err, bytesRead) {
        // console.log(buffer)
        // 将读取的3个字节写入到文件中
        fs.open(path.resolve(__dirname, 'e.txt'), 'w', (err, wfd) => {
            fs.write(wfd, buffer, 0, 3, 0, (err, written) => {
                // 释放fd，wfd
                fs.close(fd, () => {
                })
                fs.close(wfd, () => {
                })
            })
        })

    })
})
