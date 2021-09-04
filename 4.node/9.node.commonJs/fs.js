
// commonJs规范有三种模块：
// 自定义模块、文件模块 / 第三方模块 / 内置模块

// 内置模块和核心模块node自带的，引用的时候不需要安装
const fs = require('fs');
let r1 =fs.readFileSync('./a.js','utf8') // 同步读取
let r2 = fs.existsSync('./a.js') // 同步判断文件是否存在
