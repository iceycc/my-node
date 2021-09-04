let fs = require('fs').promises;
// async + await = generator + co

// generator : redux saga
function* readAge(filePath) {
    try {
        let a = yield fs.readFile(filePath, 'utf8')
        let b = yield fs.readFile(a.trim(), 'utf8')
        let c = yield fs.readFile(b.trim(), 'utf8')
        return c
    } catch (err) {
        console.log(err)
    }
}

// let it = readAge('./a.txt')
// let {value, done} = it.next();
// Promise.resolve(value).then(data => {
//     let {value, done} = it.next(data)
//     Promise.resolve(value).then(data => {
//         let {value, done} = it.next(data)
//         Promise.resolve(value).then(data => {
//             console.log(data)
//         })
//     })
// })

let it2 = readAge('./a.txt')

// co库 ： generator自执行器，自动解析yield方法，自动调用it.next()
// 异步串行
function co(it) {
    return new Promise((resolve, reject) => {
        // 异步迭代  递归（函数来迭代）vueRouter next就是异步迭代，koa的next
        // 同步就是循环，（例如 PromiseAll）
        function next(val) {
            let {value, done} = it.next(val)
            if (done) {
                resolve(value)
            } else {
                Promise.resolve(value).then(data => {
                    next(data)
                }, reject) // 有一个挂了就
                // Promise.resolve(value).then(data => {
                //     next(data)
                // }, ()=>{
                //     it.throw('出错了')
                // }) // 有一个挂了就
            }
        }

        next()
    })
}

co(it2).then(data => {
    console.log('generator co:', data)
})

// async + await
// ast语法解析的时候会转为 generator + co
async function asyncReadAge(filePath) {
    try {
        let a = await fs.readFile(filePath, 'utf8')
        let b = await fs.readFile(a.trim(), 'utf8')
        let c = await fs.readFile(b.trim(), 'utf8')
        return c
    } catch (err) {
        console.log(err)
    }
}

asyncReadAge('./a.txt').then(data => {
    console.log('async await: ', data)
})


// 同步阻塞 forEach 遍历
