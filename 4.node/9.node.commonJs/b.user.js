// 1） 文件模块的解析流程， 解析流程新老版本不一样
// 默认会找文件，再找文件夹
// package.json 包的描述信息。老版本会先找包，再找文件
// 没有 ./ 或 ../ 或绝对路径 会被任务是第三方模块或者核心模块

// 2）第三方模块会安装到node_modules文件夹
let jq = require('jquery') // 会根据paths逐级查找
console.log(jq)
console.log(module.paths)
    // [
    //     '/Users/bingyang/Documents/festudy/1.rollup/4.node/9.node.commonJs/node_modules',
    //     '/Users/bingyang/Documents/festudy/1.rollup/4.node/node_modules',
    //     '/Users/bingyang/Documents/festudy/1.rollup/node_modules',
    //     '/Users/bingyang/Documents/festudy/node_modules',
    //     '/Users/bingyang/Documents/node_modules',
    //     '/Users/bingyang/node_modules',
    //     '/Users/node_modules',
    //     '/node_modules'
    // ]
// 3） 第三方模块
// 全局 npm i xx -g
    // 任何地方使用
    // 安装成功会软链到全局
    //  /Users/xxx/.nvm/versions/node/v12.13.1/bin/nrm  // npm全局目录
    //  -> /Users/xxx/.nvm/versions/node/v12.13.1/lib/node_modules/nrm/cli.js //nrm全局安装到位置
// 本地 npm i xxx

// 4） 核心模块


