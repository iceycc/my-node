// 管道pipe
const fs = require('fs');
const path = require('path');
const ReadStream = require('./6.CreateReadSteam')
const WriteStream = require('./9.CreateWriteStream')


// 边读编写：
// 读4个写1个：第一次读的不管期望的写入值会直接写入，其他的继续读，会放进缓存，浪费缓存空间。
const rs = new ReadStream(path.resolve(__dirname, 'a.txt'), {
    highWaterMark: 4
})
const ws = new WriteStream(path.resolve(__dirname, 'b.txt'), {
    highWaterMark: 1
})
rs.on('data', chunk => {
    console.log(chunk.toString())
    let w = ws.write(chunk)
    if (!w) {
        rs.pause()
    } else {
        ws.end()
    }
    // console.log(w)
})
ws.on('drain', () => {
    rs.resume()
})
rs.on('end', () => {
    ws.end();
})

// 封装一下就是rs.pipe(ws)了
