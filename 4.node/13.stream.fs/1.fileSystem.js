// file system 文件操作 api 异步 同步

// 文件读写
const fs = require('fs');
const path = require('path');

// 读取等数据默认编码都是null，二进制 buffer
// 读取文件不存在会报错
// 写入的时候没有文件会创建文件，有的话会覆盖

// 同步读写：
// 读
let r = fs.readFileSync(path.resolve(__dirname, 'a.txt'))
// 写
fs.writeFileSync(path.resolve(__dirname, 'b.txt'), r)
// 写入的也是二进制,默认utf8格式去展示，
// 如果源文件是gbk格式的，默认写入的是utf8，其实修改下文件编码类型是没有影响的，因为写入的其实都是二进制
// 同步阻塞（小文件特别快，读了直接写，不需要异步回调，速度快），后续逻辑需要等待。

//异步读写
fs.readFile(path.resolve(__dirname, 'a.txt'), (err, data) => {
    // 异步不阻塞了。但是文件过大的话会很慢,或者淹没可用内存，或者内存泄漏。
    if (err) {
        return err
    }
    fs.writeFile(path.resolve(__dirname, 'c.txt'), data, (err) => {
        if (err) return console.log('err', err)
        console.log('write ok')
    })
})
// js单线程 如果出错没有捕获，会终止运行
// 异步不阻塞了
// 文件过大的话会很慢
// node 64k以下任务是小文件

// 优化 异步读取，部分读取，部分消费。便读取边消费

// fs.open , fs.read  fs.write
