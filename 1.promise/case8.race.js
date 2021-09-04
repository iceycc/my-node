const Promise = require('./promise')
// resolve传人一个promise会等待执行，reject会直接报错
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('111')
    }, 2000)
})

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('222')
    }, 3000)
})


Promise.race([p1, p2]).then(data => {
    console.log(data)
})


// Promise.race 的应用：如何中断一个promise
//

let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('111')
    }, 2000)
})

function warp(p) {
    let abort;
    let p2 = new Promise((resolve, reject) => {
        abort = reject
    })
    let p3 = Promise.race([p2, p])
    p3.abort = abort
    return p3
}

let p = warp(promise)

setTimeout(() => {
    p.abort('超时')
}, 400)

p.then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})


