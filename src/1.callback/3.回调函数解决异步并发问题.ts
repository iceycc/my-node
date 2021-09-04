// promise
// 解决了：1、异步并发的问题 2、回调地狱的问题，回调函数

// 1、高阶函数，回调处理异步
const fs = require('fs') // 可以读取文件
const path = require('path')

function after(times,callback){
    let obj = {}
    return function(key,value){
        obj[key] = value
        --times == 0 && callback(obj)
    }
}
// let obj = {}
let fn = after(2,(obj)=>{
    console.log(obj)
})
fs.readFile(path.resolve(__dirname,'./name.txt'),'utf8',(err,data)=>{
    // obj.name = data
    fn('name',data)
})
fs.readFile(path.resolve(__dirname,'./age.txt'),'utf8',(err,data)=>{
    // obj.age = data
    fn('age',data)
})

// 2、发布订阅模式

export {}
