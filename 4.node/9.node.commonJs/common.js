const path = require('path');
const fs = require('fs');
const vm = require('vm')

// require 是Module原型上的方法 Module.prototype.require
// Module._load 加载方法
// Module._resolveFilename 解析文件名 变成绝对路径 并带有后缀
// new Module 返回一个模块（id，）表示require执行后返回的是module.exports
// Module.prototype.load
// 根据不同的后缀名调用不同的策略 js模块 json模块 .node模块
// fs.readFile读取文件内容
// Module.prototype._compiled;
// Module.wrapper 将内容包装成函数,this指向module.exports
//    this = exports = module.export = {}
// 函数执行

function Module(id) {
    this.id = id;
    this.exports = {}
}

// 不同策略解析
Module._extensions = {
    '.js'(module) {
        // console.log('module',module)
        let script = fs.readFileSync(module.id, 'utf8')
        // console.log(script)
        let code = `(function(exports,require,module,__filename,__dirname){
                ${script}
            })
        `
        let func = vm.runInThisContext(code)
        // console.log(func)
        let exports = module.exports;
        let thisValue = exports;
        let dirname = path.dirname(module.id) // 文件所在目录
        func.call(thisValue, exports, myRequire, module, module.id, dirname)
    },
    '.json'(module) {
        let script = fs.readFileSync(module.id, 'utf8')
        module.exports = JSON.parse(script)
    }
}
Module._resolveFilename = function (id) {
    let filePath = path.resolve(__dirname, id)
    const isExist = fs.existsSync(filePath)
    if (isExist) return filePath
    let _extensions = Object.keys(Module._extensions)
    for (let i = 0; i < _extensions.length; i++) {
        let newPath = filePath + _extensions[i]
        if (fs.existsSync(newPath)) return newPath
    }
    throw new Error('文件不存在')
}
Module._load = function (id) {
    // 相对路径转绝对路径,查看是否存在，添加后缀
    let filename = Module._resolveFilename(id)
    if (Module._cache[filename]) {
        return Module._cache[filename].exports
    }
    let module = new Module(filename)
    // 重复引用，增加缓存
    Module._cache[filename] = module
    module.load()
    return module.exports
}
Module._cache = {}
// 读取文件，然后给exports赋值，返回module.exports
Module.prototype.load = function () {
    // 核心加载根据不同的后缀进行加载
    let extname = path.extname(this.id)
    Module._extensions[extname](this)
}

function myRequire(id) {
    return Module._load(id)
}

module.exports = myRequire

