// promise可以解决
//   1、多个异步并发执行，最终得到所有结果
//   2、异步嵌套问题

// 1、三个状态：
    // pending 
    // resolve-> fulfilled 
    // reject-> rejected
// 2、 当每个promise都有一个then的方法，传人两个参数 一个是成功的回调一个是
// 3、new Promise会立刻执行
// 4、状态不可逆 
// 5、promise抛出异常后 会走错误态

// promise A+ https://promisesaplus.com/
let promise = new Promise((resolve,reject)=>{
    throw new Error('error')
})
promise.then((res)=>{
    console.log(res)
},(err)=>{
    console.log(err)
})