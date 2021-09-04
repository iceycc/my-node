// console.log(Object.keys(process))
// [
// 'version',
//     'versions',
//     'arch',
//     'platform', // 平台
//     'release',
//     '_rawDebug',
//     'moduleLoadList',
//     'binding',
//     '_linkedBinding',
//     '_events',
//     '_eventsCount',
//     '_maxListeners',
//     'domain',
//     '_exiting',
//     'config',
//     'abort',
//     'umask',
//     'chdir',
//     'cwd',
//     '_debugProcess',
//     '_debugEnd',
//     '_startProfilerIdleNotifier',
//     '_stopProfilerIdleNotifier',
//     'dlopen',
//     'uptime',
//     '_getActiveRequests',
//     '_getActiveHandles',
//     'reallyExit',
//     '_kill',
//     'hrtime',
//     'cpuUsage',
//     'resourceUsage',
//     'memoryUsage',
//     'kill',
//     'exit',
//     'getuid',
//     'geteuid',
//     'getgid',
//     'getegid',
//     'getgroups',
//     'initgroups',
//     'setgroups',
//     'setegid',
//     'seteuid',
//     'setgid',
//     'setuid',
//     'stdout',
//     'stderr',
//     'stdin',
//     'openStdin',
//     'allowedNodeEnvironmentFlags',
//     'assert',
//     'features',
//     '_fatalException',
//     'setUncaughtExceptionCaptureCallback',
//     'hasUncaughtExceptionCaptureCallback',
//     'emitWarning',
//     'nextTick',
//     '_tickCallback',
//     'env',
//     'title',
//     'argv', // 参数
//     'execArgv',
//     'pid',
//     'ppid',
//     'execPath',
//     'debugPort',
//     'argv0',
//     '_preload_modules',
//     'mainModule'
// ]

// 'platform', // 平台,不一样
// 写一个工具 获取用户目录
// chdir cwd env argv nextTck

// 1 cwd ---------------------------------------------
// cwd 当前工作目录 current working directory 。
// 指向当前在哪个目录执行的 绝对路径
console.log(process.cwd())
// cwd可以改变,改变执行目录
// process.chdir('../../')
// console.log(process.cwd())

// fs读取的路径是相对于cwd()的，所以可能会被更改a fs.readFile('./a.txt')
// 类比 __dirname: 不可改变，文件所在的位置
console.log(__dirname)
// 相对路径：相对的是工作目录，不是当前文件所在的目录

// 如果是一个确定的路径，使用绝对路径

// 2  env ---------------------------------------------
// console.log(process.env) // 默认会读取全局计算机系统的环境变量
// cross-env 第三方模块，兼容两个系统
// win: set NODE_ENV=development
// mac: export NODE_ENV=development
// 临时环境变量，修改当前node执行环境的env属性
// 不同执行环境环境变量不一样
// 例如：命令行执行 export NODE_ENV=development node node.prcess.js
// console.log(process.env.NODE_ENV)

// 3 argv 用户执行时的参数
console.log('------argv--------------------------------------')
// console.log(process.argv) // webpack --port 3000 --config webpack.config.js
// 0: node可执行文件, node的源
// 1:node的可执行的文件是谁
// others:用户传递的参数，解析参数
// 自己解析的方法
let program1 = {}
process.argv.slice(2).forEach((item,index,array)=>{
    if(item.startsWith('--')){
        program1[item.slice(2)] = array[index+1]
    }
})
//  node 3.node.process.js --port 3000 --c webpack.config.js
console.log(program1) // { port: '3000', c: 'webpack.config.js' }


// commander 命令行解析管家 包
// npm i commander -s
const { program } = require('commander');
program.
    version('1.0.0')
    .option("-P,--port <value>", 'set user port')
    .option("-C,--config <value>", 'set user config')

program.parse(process.argv)
console.log(program.opts().port)
// console.log(program.port)
// console.log(program.config)



