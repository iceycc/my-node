// crypto 是node中所有的加密操作都包含到了这个包中
const crypto = require('crypto')

//  摘要算法: md5 通过对文件局部内容的分析，通过一定算法得出内容
//    1、md5不能反解 （现在市面的解密都是碰撞暴力解密的）
//    2、摘要，不能根据摘要的结果 反推摘要前详细的结果
//    3、相同值摘要出的结构相同，
//    4、雪崩效应：但里面只要一点点改变，md5加密后一点也不一样了。
//    6、所有文件加密长度都一样
//    多次加密就无法解密了。
// md5算法
// 链式调用，方便大文件边读边摘要
let r = crypto.createHash('md5').update('123').update('456').update('789').digest('base64');
console.log(r)

//  加盐算法: sha1/sha256
//    md5加密同一个内容得到完全一样的内容，不安全；
//    通过加入一个参数区分 sha + md5 ，这时候相同内容如果sha不一样结果也一样了。
//  不知道盐值就无法解密
let r2 = crypto.createHash('sha1','wby').update('123').update('456').digest('base64');
console.log(r2)

// 加密算法表示能解密


