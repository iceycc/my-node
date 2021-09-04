// export {}
const Promise = require('./promise')
const promise = new Promise((resolve, reject) => {
    setTimeout(() =>{
        if (Math.random() > 0.5) {
            resolve('>0.5')
        } else {
            reject('<0.5')
        }
    },1000)
})

promise.then(data => {
    console.log('success2', data)
}, err => {
    console.log('error2', err)
})
