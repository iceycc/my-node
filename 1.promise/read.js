Promise.resolve(1)
    .then(x=>x+1) // 2
    .then(x=>{throw new Error('my error')})
    .catch(()=>1) // 返回普通值，进入下一个then成功的回调
    .then(x=>x+1) // 2
    .then(x=>console.log(x)) // 2
    .catch(console.err)
