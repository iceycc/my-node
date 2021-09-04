// Buffer代表node中的二进制对象(表现为16进制）内存
// 大小不能随意更改

let buf1 = Buffer.alloc(10); // node中最小的是字节
let buf2 = Buffer.from([1, 10, 22, 18, 256])
let buf3 = Buffer.from('王冰洋')
console.log(buf1, buf1.length)
console.log(buf2, buf2.length)
console.log(buf3, buf3.length)
// buffer 字节长度声明后不能改变

// buffer可以和任意字符串任意转换 toString
// 默认utf-8
// type BufferEncoding = "ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | "hex";
console.log(buf3.toString('base64')) // webpack : file-loader转base64的原理
// console.log(buf3.toString('gbk')) // 不支持 错误
const iconvLite = require('iconv-lite')//
const fs = require('fs');
const path = require('path');
// 用utf8读取gbk格式的文件，会乱码
let r1 = fs.readFileSync(path.resolve(__dirname, 'gbk.txt'), 'utf8')
console.log(r1) // 乱码
let r2 = fs.readFileSync(path.resolve(__dirname, 'gbk.txt'))
console.log(r2) //  utf8格式下乱码,不传默认为buffer格式
// r2: <Buffer cd f5 b1 f9 d1 f3 0a>
let r3 = iconvLite.decode(r2, 'gbk')
console.log(r3)
