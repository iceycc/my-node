
// global对象

// console.log(global) //global //对比浏览器的window
// console.dir(global,{showHidden:true})
// 一些重要的属性
// 全局属性
// console.log(global) // setTimeout / setInterval / queueMicrotask / queueMicrotask / setImmediate
// console.log(process) // 进程
// console.log(Buffer) // console.log(global.Buffer)
// 模块化fs，手写commonJS规范，npm的使用 内置的其他模块


// 模块中的全局对象： __dirname、__filename、exports、module、require() 看起来是全局的，其实不是，仅存在与模块作用域中。并不是挂在全局上的
console.log(console === global.console)
console.log(__dirname !== global.__dirname) // global.__dirname undefined
