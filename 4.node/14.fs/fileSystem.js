let fs = require('fs');
const path = require('path');

// fs.mkdir
// fs.rmdir
// fs.unlink
// fs.readdir
// fs.stat => isFile isDirectory
//

// https://gitee.com/jw-speed/jiagouke3node/blob/master/8.fs/3.fs.js

// 尽量不要阻塞主进程，用异步
// linux命令 mkdir -p a/b/c/d/e

// node无法创建不存在的多层目录
// fs.mkdir('a/d', function (err) {
//     console.log(err)
// })

// 不能删除非空目录，ENOTEMPTY
// fs.rmdir('a', function (err) {
//     console.log(err)
// })

// 删除树目录
// 串行 co
// 并发 异步


//1. 异步串行，深度优先
function rmDir1(dir, callback) {
    let stat = fs.statSync(dir)
    if (stat.isFile()) return fs.unlink(dir, callback)
    fs.readdir(dir, (err, dirs) => {
            dirs = dirs.map(d => path.join(dir, d))
            let index = 0

            function next() {
                if (index === dirs.length) return fs.rmdir(dir, callback)
                let current = dirs[index++]
                rmDir1(current, next)
            }

            next()
        }
    )
}

// rmDi1r1(path.join(__dirname, 'a'), () => {
//     console.log('删除成功1')
// })

// 2.异步串行 广度优先
function rmDir2(dir, callback) {
    let stack = [dir];
    fs.stat(dir, (err, statObj) => {
        if (statObj.isFile()) {
            fs.unlink(dir, callback)
        } else {
            let idx = 0;

            function next() {
                let currentDir = stack[idx++]
                if (!currentDir) {
                    console.log(stack)
                    reverseRemove()
                    return
                }
                fs.stat(currentDir, (err, statObj) => {
                    if (statObj.isDirectory()) {
                        fs.readdir(currentDir, (err, dirs) => {
                            if (err) return console.log(err)
                            dirs = dirs.map(d => path.join(currentDir, d))
                            console.log(dirs)
                            stack.push(...dirs)
                            next()
                        })
                    } else {
                        next()
                    }
                })
            }

            next()
        }
    })

    function reverseRemove() {
        let idx = stack.length - 1;

        function next() {
            if (idx < 0) return callback()
            let cur = stack[idx--]
            fs.stat(cur, (err, statObj) => {
                if (err) return
                if (statObj.isFile()) {
                    fs.unlink(cur, () => {
                        next()
                    })
                } else {
                    fs.rmdir(cur, () => {
                        next()
                    })
                }
            })
        }

        next()
    }
}

//
// rmDir2(path.join(__dirname, 'a'), () => {
//     console.log('删除成功2')
// })

// 3. 并发删除
function rmDir3(dir, callback) {
    fs.stat(dir, (err, statObj) => {
        if (statObj.isFile()) {
            fs.unlink(dir, callback)
        } else {
            fs.readdir(dir, (err, dirs) => {
                dirs = dirs.map(d => path.join(dir, d))
                if (dirs.length === 0) {
                    return fs.rmdir(dir, callback)
                }
                let idx = 0;

                function removeCount() {
                    if (++idx === dirs.length) {
                        fs.rmdir(dir, callback)
                    }
                }

                dirs.forEach(dir => {
                    rmDir3(dir, removeCount)
                })
            })
        }
    })
}

/*
rmDir3(path.join(__dirname, 'a'), () => {
    console.log('删除成功3')
})
*/

// 4、promise优化

function rmDir4(dir) {
    return new Promise((resolve, reject) => {
        fs.stat(dir, (err, statObj) => {
            if (err) reject(err);
            if (statObj.isFile()) {
                fs.unlink(dir, resolve); // 如果是文件直接删除即可
            } else {
                // 同时删除子元素 （如果子元素为空需要删除自己）
                fs.readdir(dir, (err, dirs) => {
                    if (err) reject(err);
                    // map返回的是删除儿子列表的promise数组
                    dirs = dirs.map(d => rmDir4(path.join(dir, d)));
                    Promise.all(dirs).then(() => {
                        fs.rmdir(dir, resolve)
                    }).catch(err => {
                        reject(err);
                    })
                })
            }
        });
    })
}

// rmDir4(path.join(__dirname, 'a')).then(data => {
//     console.log('删除成功4')
// })

//  5.使用async + await
// 异步串行
// 深度优先，广度优先
fs = require('fs').promises // 内置的promise方法，区别同步代码，同步会阻塞

async function rmDir5(dir) {
    let statObj = await fs.stat(dir); // statObj, 如果文件不存在就报错了
    if (statObj.isDirectory()) {
        let dirs = await fs.readdir(dir); // 这个返回的是数组
        // 将所有子文件进行删除 并且用promise.all包裹起来
        // Promise.all返回的是promise实例
        await Promise.all(dirs.map(d => rmDir5(path.join(dir, d))));
        await fs.rmdir(dir)
    } else {
        await fs.unlink(dir);
    }
}

rmDir5(path.join(__dirname, 'a')).then(data => {
    console.log('删除成功5')
})

// fs.readFile
// fs.writeFile
// fs.existSync
// fs.state
// fs.rmdir
// fs.mkdir
// fs.unlink

// fs.read
// fs.write
// fs.crateReadStream
// fs.createWriteStream
