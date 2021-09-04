const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('你好')
})

const server = app.listen(3000, () => console.log('服务器已就绪'))

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('进程已终止')
    })
})
setTimeout(()=>{
    // process.exit(0) // 杀死进程
    process.kill(process.pid, 'SIGTERM')
},5000)

