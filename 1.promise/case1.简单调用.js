// ts-nonde index.ts
const Promise = require('./promise')
// export default Promise;
const promise = new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
        resolve('>0.5')
    } else {
        reject('<0.5')
    }
})

promise.then(data => {
    console.log('success1', data)
}, err => {
    console.log('error1', err)
})
