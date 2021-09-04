// 问题1： module.exports 和 exports
(function () {
    let exports = module.exports = {}
    module.exports = 5
    module.exports.b = 3
    module.exports = {
        b: 4
    }
    exports.b = 1
    exports = 2 // 这样就和module.exports 无关了
    console.log(module.exports)

})()

// 问题2：a模块对global和b模块的global是一样的么。
// 如果有引用关系的化，global上的属性会共享

// 问题3：同时写exports和modules.exports？注意引用关系

// 问题 es6和commonjs的区别

// 如果处理多次引用？
// 循环引用？其实就是代码逻辑有问题a

// 被导出文件延迟改变导出值?
;(function(){
    let module = {}
    let exports = module.exports = {}
    let a = 0
    setTimeout(()=>{
        a++
    },1000)
    module.exports = a
    console.log(a)
    setTimeout(()=>{
        console.log(a)
    },2000)
})()
