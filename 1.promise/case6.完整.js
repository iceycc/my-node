const fs = require('fs');
const path = require('path');
const Promise = require('./promise')
const resolve = (url) => path.resolve(__dirname, url)

// 回调地狱
fs.readFile(resolve('./a.txt'), 'utf8', (err, data) => {
    fs.readFile(resolve('./' + data.trim()), 'utf8', (err, data) => {
        fs.readFile(resolve('./' + data.trim()), 'utf8', (err, data) => {
            console.log('11', data)
        })
    })
})

// promise封装
// function read(url) {
//     return new Promise((resolve, reject) => {
//         fs.readFile(url, 'utf8', (err, data) => {
//             if (err) reject(err)
//             resolve(data)
//         })
//     })
// }
function read(url) {
    let dfd = Promise.deferred(); // 延迟对象,解决一层嵌套问题
    fs.readFile(url, 'utf8', (err, data) => {
        if (err) dfd.reject(err)
        dfd.resolve(data)
    })
    return dfd.promise
}

read(resolve('./a.txt'))
    .then(data => {
        return read('./' + data.trim())
    })
    .then(data => {
        return read('./' + data.trim())
    })
    .then(data => {
        console.log('22', data)
    })


// nodeapi -》 promise
function promisify(fn) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            fn(...args, (err, data) => {
                if (err) reject(err)
                resolve(data)
            })
        })
    }
}

const read1 = promisify(fs.readFile) // 返回一个promise
read1(resolve('./a.txt'), 'utf8').then(data => {
    return read1(resolve('./' + data.trim()), 'utf8')
}).then(data => {
    return read1(resolve('./' + data.trim()), 'utf8')
}).then(data => {
    console.log('33', data)
}).catch(err => {
    // console.log(err)
})


// promise all
Promise.all([read(resolve('./a.txt')), read(resolve('./b.txt')), 55, 66, 77]).then(data => {
    // console.log('44',data)
}).catch(err => {
    console.log('55', err)
})
