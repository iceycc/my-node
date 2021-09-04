let buf1 = Buffer.from([1, 2, 3]) // 只能0-255,  不识别的或超出的默认为0
let buf2 = Buffer.from('王冰洋')
let buf3 = Buffer.alloc(12)
console.log(Buffer.allocUnsafe(10)) // 不安全,不用清空，更快。
console.log(buf1)
console.log(buf2)
console.log(buf3)

// 需要对内存进行拼接处理，可以声明一个更大对buffer，然后将多个buffer拷贝上去
let buf4 = Buffer.from('你好')
let buf5 = Buffer.from('世界')
console.log(buf4[0].toString(16), buf4)
console.log(buf4[1].toString(16), buf4)
let buf = Buffer.alloc(12)

// buffer.copy(targetBuffer,targetStart,sourceStart,sourceEnnd)
// buffer是内存？
buf4.copy(buf, 0, 0, 6)
console.log(buf)
buf5.copy(buf, 6, 0, 6)
console.log(buf)
// 实现一个buffer.copy
// copy的时候如果目标buffer是很长的空buffer对象，填不满的话，会浪费空间。需要计算目标buffer长度和源buffer长度？？
Buffer.prototype.copy = function (targetBuffer, targetStart, sourceStart = 0, sourceEnd = this.length) {
    for (let i = sourceStart; i < sourceEnd; i++) {
        targetBuffer[targetStart++] = this[i] // 将自身对buffer中的内容拷贝到目标buffer上。
    }
}

// buffer.slice()
// buffer 索引 类别数组 长度 。buffer每一位存对是内存，其实是引用类型
let buf6 = Buffer.from([1, 2, 3])
let buf7 = buf6.slice(0, 1)// 在内存地址上截出一个位置
buf7[0] = 4
console.log(buf6)
let arr = [[1], [2], [3]]
arr1 = arr.slice(0, 1)
arr1[0][0] = 4
console.log(arr)


// Buffer.concat 静态方法
let buf8 = Buffer.concat([buf4, buf5]) // totalLength传人会按传人的，不传会自动计算长度
console.log(buf8.toString())
// 自己实现一个concat
Buffer.concat = function (bufferList, length) {
    if (typeof length === 'undefined') {
        length = 0
        bufferList.forEach(buffer => {
            length += buffer.length
        })
    }
    let newBuffer = Buffer.alloc(length)
    let offset = 0
    bufferList.forEach(buffer => {
        buffer.copy(newBuffer, offset)
        offset += buffer.length
    })
    return newBuffer
}
let buf9 = Buffer.concat([buf4, buf5]) // totalLength传人会按传人的，不传会自动计算长度
console.log(buf9.toString())

// isBuffer()
Buffer.isBuffer(buf8)

// indexOf
let buf10 = Buffer.from('我不爱你呀')
let index = buf10.indexOf('爱')
console.log(index)
let index2 = buf10.indexOf('爱', 10)
console.log(index2)

// 数据解析，按照一定的格式进行拆解解析。
// buffer.split() 这个方法不存在
// http数据传输的是二进制流。需要解析
Buffer.prototype.split = function (sep) {
    let arr = [];
    let offset = 0;
    let current = 0;
    let len = Buffer.from(sep).length;
    while (-1 !== (current = this.indexOf(sep, offset))) {
        arr.push(this.slice(offset, current));
        offset = current + len;
    }
    arr.push(this.slice(offset))
    return arr;
}
let buf11 = Buffer.from('哈哈-你好呀-我是冰洋-1') //
console.log(buf11.split('-')[3]); // <Buffer 31>  注意 31为16进制，十进制为16*3+1=49，在ACII码表对应的就是1
console.log(buf11.split('-').toString());

