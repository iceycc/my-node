// 自定义需要显示到命令行中的命令
const config = { // 给自己来维护参数的
    'port':{
        option:'-p,--port <n>', // <v> 表示时一个值
        descriptor:'set your server port',
        default: 8080,
        usage:'i-hs --port <n>'
    },
    'directory':{
        option:'-d,--directory <n>',
        descriptor:'set your server start directory',
        default: process.cwd(),
        usage: 'i-hs --directory <n>'
    },
    'cache':{
        option:'-c,--cache <n>',
        descriptor:'set your server cache',
        default:'no-cache',
        usage: 'i-hs --cache <n>'
    }
}
module.exports = config;
