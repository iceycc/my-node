let a = 1;
// eval
eval('console.log(a)') // 1 eval执行不会产生沙箱机制，可以依赖外部变量

// new Function
let b = 2;
global.b = 3;
let fn = new Function('console.log(b)') // 3 将字符串创建成一个全局作用域的函数不依赖外层变量，但是可以依赖全局变量
fn()

// vm
const vm = require('vm');
vm.runInThisContext('console.log(b)')
