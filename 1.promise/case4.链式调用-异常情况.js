const Promise = require('./promise')
let promise1 = new Promise((resolve, reject) => {
    resolve('ok1')
})
    .then(data => {
        console.log(data)
        return promise1 // 返回本身
    })

promise1.then(data => {
        console.log(data)
    }, err => {
        console.log(err)
    })



let result = {}
let index = 0
Object.defineProperty(result,'then', {
    get(){
        if(index++ === 2) {
            throw new Error('报错了')
        }
    }
})
let promise2 = new Promise((resolve, reject) => {
    resolve('ok1')
})
    .then(data => {
        console.log(data)
        return result // 返回一个对象，有then方法，但是会报错
    })

promise2.then(data => {
    console.log(data)
}, err => {
    console.log(err)
})
