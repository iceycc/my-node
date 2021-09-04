// Buffer 二进制对象
// 浏览器没有读写操作，有二进制对象 Blob -> File

// js运行在node环境下，对文件做处理 前端传递的文件呢都是二进制对象
// Buffer -》 二进制 和 字符串可以方便转化
// 存储二进制 禁止转换
// 单位
// 1个字节 8个位（0/1）
let sum = 0;
for (let i = 0; i < 8; i++) {
    sum += Math.pow(2, i)
}
console.log(sum)
console.log(Math.pow(2, 8) - 1)
// 编码规范
// ASCII  127个

// 字母和字符 都是一个字符组成
// 一个汉字两个字符组成
// GB2312 -》GBK -》GB18030 : 双字节 255 * 255

// unicode 编码 -》utf8
// utf8 1-4个可变字节长度，一个汉字3个字节
// node中不支持gbk编码，只支持utf8

// 二进制 0b
// 八进制 0
// 十六进制： 0x

// 把任意进制转为十进制
console.log(parseInt('11111111', 2)) // 255
console.log(parseInt('0xff', 16)) // 255
console.log(parseInt('0377', 8)) // 255
// 任意进制互转
console.log(255..toString(2)) // 11111111
console.log(0b11111111.toString(16)) // ff
console.log(0xff.toString(8)) // 377
console.log(0o377.toString(10)) // 255


// 位运算符
// |  &  <<  针对的是二进制

// << 位移 右移动多少
console.log(1 << 3)
console.log(2 ** 3) // 等价于 2的n次方
// 00000001  -->   00000100
console.log(0b00000001, 0b00001000)

// | 取或
console.log((0b110 | 0b001).toString(2))
// & 取与
console.log((0b110 & 0b001).toString(2))




