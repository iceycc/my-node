const Promise = require('./promise')
let promise1 = new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
        resolve('ok1')
    } else {
        reject('err1')
    }
})
promise1.then().then().then().then(data => {
    console.log(data)
}, err => {
    console.log(err)
})


