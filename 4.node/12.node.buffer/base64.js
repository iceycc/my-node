// base64编码，没有加密功能
// 作用：用于传输，图片转base64
// 优点：可以放到任何代替的url路径砂锅、图片、背景图、链接

// 把一个汉字变成base64编码?
// https://blog.csdn.net/weixin_42420703/article/details/81384901
// 一个汉字由3个字节组成 24个位
// 表示把一个汉字转换成2进制 表现形式是16进制
console.log(Buffer.from('王'))  // 把一个汉字转成二进制，表现形式是16进制,16进制更短
//-> <Buffer e7 8e 8b>
// 只是表现形式不同，可以转成二进制：
console.log(0xe7.toString(2)) // 11100111
console.log(0x8e.toString(2)) // 10001110
console.log(0x8b.toString(2)) // 10001011
// base64  8 *3 => 6 * 4 ,就是之前三个字符表示一个汉字转成4个字符表示一个汉字，所以base64会使体积变大1/3。
// <Buffer e7 8e 8b>
// -> 11100111 10001110 10001011 （8 * 3）
// -> 111001111000111010001011
// -> 111001 111000 111010 001011  （6 * 4）
// -> 00111001 00111000 00111010 00001011 （补0）最多是63
// -> 57  56  58  11  (转十进制）
// -> 546L (base64)
console.log(parseInt(0b00111001))
console.log(parseInt(0b00111000))
console.log(parseInt(0b00111010))
console.log(parseInt(0b00001011))
// base64的编码规范表你
let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
str += str.toLowerCase()
str += '012345678+/' // 64个数字
// 将57  56  58  11 映射base64编码
console.log(str[57] + str[56] + str[58] + str[11]) //546L


const Base64 = {
    decode(str){

    },
    encode(str){

    }
}
