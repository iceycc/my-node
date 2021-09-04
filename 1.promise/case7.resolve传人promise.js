const Promise = require('./promise')
// resolve传人一个promise会等待执行，reject会直接报错
let promise = new Promise((resolve, reject)=>{
    resolve(new Promise((resolve, reject)=>{
        resolve(111)
    }))
})
promise.then(data=>{
    console.log(data)
})
