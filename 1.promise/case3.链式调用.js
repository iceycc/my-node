const Promise = require('./promise')
// promise支持链式调用
// 1、无论成功还是失败都可以返回结果（
//  1 出错了走错误，
//  2 返回一个普通值（不是promise的值）会作为下一次成功的结果，没有返回就是 undefined
//  3 返回一个promise: 会采用promise的状态，用哪个promise解析后的结果传递下去
// 2、返回值：
//  - 普通值 调用then后都会返回一给全新的promise，并把返回值传递给下一次的resolve（为什么不能返回this？状态不可逆）
//  - 出错了 调用下一次promise的reject
//  - promise
new Promise((resolve, reject) => {
    resolve('ok1')
    // reject('err1')
})
    .then(data => {
        console.log('ok2', data)
        // return 'ok2'
        throw new Error('ok2 err')// 走到下次失
    }, err => {
        console.log('err2',err)
        throw new Error('err2')// 走到下次失败
    })
    .then(data => {
        console.log('ok3', data)
    }, err => {
        console.log('err3',err)
        return 'err3' // 会走到下次的成功态里

    })
    .then(data => {
        // 返回的是一个promise
        console.log('ok4',data)
        return new Promise((resolve, reject) => {
            resolve(new Promise((resolve,reject)=>{
                resolve(11111)
            }))
            // reject(12)
        })
    })
    .then(data => {
        console.log('success', data)
    }, err => {
        console.log('error', err)
    })
