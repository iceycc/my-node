// 可写流也是基于fs模块 但是内部是继承自stream流中的Writeable接口
const fs = require('fs');
const path = require('path');
const CreateWrite = require('./9.CreateWriteStream');
// let ws = fs.createWriteStream(path.resolve(__dirname, 'h.txt'), {
let ws = new CreateWrite(path.resolve(__dirname, 'h.txt'), {
    flags: 'w',
    encoding: 'utf8',
    mode: 0o666,
    autoClose: true,
    start: 0,
    highWaterMark: 5, // 16 x 1024k 默认期望16k 不影响写入没写如
    // 我期望使用多少个字节完成写入操作，如果超出后write的返回值会变成false；
    // 返回false后用户可以操作不再继续写入，因为会占用内存空间
})

// 循环操作是同步的，会批量写入十次，第一次调用fs.write直接往文件写，后续操作都会放到内存的一个队列中。
//  读和写的搭配流程：
// 先读取-》调用write方法写入，如果放不下超过预期，暂停读取 -》等待写入完毕后-》触发drain事件-》再恢复读取，周而复始。实现边读边写的功能
function forWrite() {
    for (let i = 0; i < 10; i++) {
        let w = ws.write(i + '', 'utf8', () => {
        })
        // 超过预期或等于预期，w都会为false
        console.log(w)
    }
}

// forWrite()

// 所以需要用递归，异步串行
let index = 0

function write() {
    let writing = true;
    while (++index < 10) {
        // 写入一个会清空队列中的一个
        writing = ws.write(index + '', 'utf8')
        // 达到预期就会停止
        if (!writing) {
            // 不能在关闭后写入， end = write + close
            break;
        }
    }
    if (index === 10) {
        ws.end('ok');
    }

}

ws.on('drain', () => {
    // 抽干，当写入的个数达到或者超过预期后，然后被消费掉后，会触发drain事件
    // 可以设置highWaterMark为比较小的值，当填满管子，然后又被抽干后，触发。
    // 节约资源,这样只占用highWaterMark
    // 触发end就不会触发drain
    console.count('drain')
    write()
})

ws.on('close', () => {
    console.count('closed')
})
ws.on('error', (err) => {
    console.log(err)
})
write()

// write()
// end()

