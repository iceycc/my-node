// 管道pipe
// const fs = require('fs');
const path = require('path');
const ReadStream = require('./6.CreateReadSteam')
const WriteStream = require('./9.CreateWriteStream')
const rs = new ReadStream(path.resolve(__dirname, 'a.txt'))
const ws = new WriteStream(path.resolve(__dirname, 'b.txt'))

// // 边读边写，为了解决大文件读写
rs.pipe(ws)
