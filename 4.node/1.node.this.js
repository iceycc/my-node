// node中this指向？

// 1-文件中最外层指向module.exports,默认是{}
// commonJs规范，表示所有代码写到文件中，外面会自带一层函数，函数执行改变了this指向
console.log(this) // {}
//

// 2- iife 指向global
// 自执行函数中的this永远指向全局对象
;(function () {
    // console.log(this) // global对象
})()





