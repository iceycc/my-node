// 红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次；如何让三个灯不断交替重复亮灯？
;(function light() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('red')
            resolve()
        }, 3000)
    }).then(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('yellow')
                resolve()
            }, 2000)
        })
    }).then(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('green')
                resolve()
            }, 1000)
        })
    }).then(() =>{
        light()
    })
})()
