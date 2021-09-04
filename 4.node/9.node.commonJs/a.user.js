const a1 = require('./a'); // require是同步的
require('./a')
require('./a')
const json1 = require('./a.json')
console.log('a1: ', a1)
console.log('json1', json1)
// =>
// let r = (function(module,require,__dirname,__filename){
//     module.exports = 'A'
//
//     return module.exports
// })(module,require,__dirname,__filename)
//
// console.log(r)

const myRequire = require('./common')
const a2 = myRequire('./a') // 我的模块加载
const json2 = myRequire('./1')
myRequire('./a')
myRequire('./a')
console.log('a1:', a2)
console.log('json2', json2)


console.log('c1', a1.c)
console.log('c2', a2.c)
setTimeout(() => {
    // 基本数据类型和引用数据类型
    console.log('2000 c1', a1.c)
    console.log('2000 c2', a2.c)
    // 缓存了
    let ac1 = require('./a').c
    let ac2 = myRequire('./a').c
    console.log('2000 c1', ac1 )
    console.log('2000 c2', ac2 )
}, 2000)


// debbger调试 端点
// 终端执行 node --inspect-brk b.js
// 文档：https://nodejs.org/en/docs/inspector









