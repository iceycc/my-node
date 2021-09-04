type callBack = () => void;
type ReturnFn = (...args: any[]) => void;
interface Function {
    before(fn: callBack): ReturnFn
}

// promise 都是基于回调模式的
// 高阶函数 1.如果你的函数参数是一个函数  2. 如果一个函数返回一个函数 满足任何一个即可。

// 需求：基于原理的代码拓展

// 原业务函数
function core(...args) {
    console.log('core ...', ...args)
}

// 单独给改函数增加
// core.before = function(){
//     console.log('before...')
// }

// 给所有函数添加
Function.prototype.before = function (fn) {
    return (...args) => {
        fn()
        this(...args)
    }

}

const fn = core.before(() => {
    console.log('before core ...')
})

fn();
// export {} // 模块导出



