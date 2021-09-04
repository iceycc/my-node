// const Promise = require('./promise')
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

// Promise.allSettled
Promise.allSettled([p1, p2]).then(data => {
    console.log(data)
})




