// 可写流也是基于fs模块 但是内部是继承自stream流中的Writeable接口

const fs = require('fs');
const path = require('path');


let ws =  fs.createWriteStream(path.resolve(__dirname, 'g.txt'), {
    flags: 'w',
    encoding: 'utf8',
    mode: 0o666,
    emitClose: true,
    start: 0,
    highWaterMark: 16, // 16 x 1024k 默认期望16k 不影响写入没写如
})
// 每次open才会将文件清空，同一个流是一直往里面写。
// 同一个写入流，多次write的时候，其实会依次加入一个存储待写入buffer的队列（链表）
// 当前的写入完毕，再从队列拿出依次写入
let w = ws.write(' ok1', 'utf8', (err) => {
    console.log('ok1')
})
console.log(w)
w = ws.write(' ok2', 'utf8', (err) => {
    console.log('ok3')
})
console.log(w)
w = ws.write(' ok3', 'utf8', (err) => {
    console.log('ok3')
})
console.log(w)
w = ws.write(' ok4', 'utf8', (err) => {
    console.log('ok4')
})
console.log(w)
w = ws.write(' ok5', 'utf8', (err) => {
    console.log('ok5')
})
console.log(w)


