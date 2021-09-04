// 不算全局属性的全局属性（就是没有挂载到global上的）

// 模块化机制：
// - seajs（cmd）
// - require（amd）依赖前置
// - 单例模式
// - iife

// 为什么需要模块化？
// 解决冲突，高内聚、低耦合

// 单利模式：无法解决命名冲突
let obj1 = {}
let obj2 = {}

// iife自执行函数
;(function(){
    let a = 1
    let b = 2
    console.log(a+b)
})()

// commonJS规范 、 esModule规范、 umd规范（通用模块规范） 、 systemJS（微前端有用到）

// commonJS规范：依赖于node特性，可以按需依赖，无法实现tree shaking

// es6模块： 只能静态依赖，可以分析依赖实现tree shaking
// import('xxx')还没成规范，但是webpack可以通过babel使用
