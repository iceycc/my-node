// 之前的嵌套
// 嵌套  读写可以分开操作 （发布订阅来进行解耦） fs就基于流来实现 大文件的读取
// fs中 createReadStream createWriteStream  基于stream模块来实现的

const fs = require('fs');
const path = require('path');

let createReadStream = fs.createReadStream
let MyCreateReadSteam = require('./6.CreateReadSteam');

// mode
// ll 查看文件属性
// drwxr-xr-x   21 bingyang  staff   672B Aug 10 07:40 1.promise
// d(rwx) (r-x) (r-x)
//   自己  所属组   其他人
// d 文件夹
// r 可读 4
// w 可写 2
// x 可执行 1
// rwx 777 最高权限
// rw 666 可读可写

// rs是可读流对象
// let rs = createReadStream(path.resolve(__dirname, 'a.txt'), {
let rs = new MyCreateReadSteam(path.resolve(__dirname, 'a.txt'), {
    flags: 'r',
    encoding: null,
    mode: 0o666, // 一般用不到，除非无权限读时候可以用到。代表权限，八进制，0o666；也可以写438，但是不好记忆
    autoClose: true,
    start: 0, //
    end: 100,
    highWaterMark: 3, // 每次读多少
})

rs.on('open', function (fd) {
    // 内部会emit
    console.log(fd)
})
let arr = [] // 暂时存储在内存
rs.on('data', function (chunk) {
    console.log(chunk)
    rs.pause() // 暂停 读取  resume 恢复
    arr.push(chunk)
    // 一边读一边写 --》可写流
})
rs.on('end', function () {
    console.log(Buffer.concat(arr).toString())
})
rs.on('close', function (close) {
    // close需要读取数据完毕后才能触发
    console.log('close', close)
})
rs.on('error', function (error) {
    console.log('error', error)
})
setInterval(()=>{
    rs.resume(); // 暂停后继续
},1000)
// 文件流和流是两个概念 文件流基于流实现。
// 文件流标志：on('open')和on('close')事件
// 可读流标志：on('data') on('end')

// on('data')  on('end')  on('error')
// on('open')  on('close')
// rs.pause()   rs.resume()
