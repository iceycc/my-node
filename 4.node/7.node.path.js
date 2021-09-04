const path = require('path');

// resolve和join会根据系统对/进行转义
// resolve默认第一个参数为process.cwd()解析，然后拼接；
// 不要碰到 / 会到根目录;
// 但可以是 ./，表示当前目录
console.log(path.resolve('a','b')) // process.cwd() + /a + /b
console.log(path.resolve(__dirname,'a','./b','./c.js')) // 解析绝对路径，默认以process.cwd()解析。如果传人一个绝对路径就以第一个为
// join仅拼接。
console.log(path.join('a','b')) // a/b
console.log(path.join(__dirname,''))

console.log(path.extname('a.js'))
console.log(path.relative('a','a/b/c.js')) // 相减，差异的部分
console.log(path.relative('a/b/c.js','a')) // 相减，差异的部分
console.log(path.dirname('a/b/c/d/e.js'))
console.log(__dirname)
console.log(path.posix.resolve(__dirname,'./b', './a.js')) // / 不转义
