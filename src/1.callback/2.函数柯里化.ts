export {}
// 函数柯里化：
//  ”函数柯里化”是指将多变量函数拆解为单变量的多个函数的依次调用， 可以从高元函数动态地生成批量的低元的函数。
//   简单讲：就是利用函数执行，可以形成一个不销毁的私有作用域，把预先处理的内容都存在这个不销毁的作用域里面，并且返回一个函数，以后要执行的就是这个函数。
// 柯里化的功能：
//  - 参数复用。让函数更具体（保留参数）
//  - 提前确认
//  - 延迟调用
// 反柯里化 偏函数：让函数的范围变大
// https://blog.csdn.net/aaaaa1994/article/details/94359366


// 判断一个变量类型（参数复用）
// 1.typeof 2.constructor 3.intanceof 4.Object.prototype.toString.call()

type Typing = 'String' | 'Number' | 'Boolean' | 'Object' | 'Function'

function isTypeBase(val: unknown, typing: Typing) { //
    return Object.prototype.toString.call(val) === `[object ${typing}]`
}

// 1、简单判断需要传俩参数
console.log(isTypeBase('string', 'String'))

// 2、利用柯里化实现
function isType(typing: Typing) {
    return function (val: unknown) {
        return isTypeBase(val, typing)
    }
}

const isString = isType('String');
const isBoolean = isType('Boolean')

console.log(isString(1111))
console.log(isBoolean(true))

// 3、封装
type ReturnFn1 = (val: unknown) => boolean;
type isTyping = 'isString' | 'isNumber' | 'isBoolean'
let utils: Record<isTyping, ReturnFn1> = {} as any;
(['String', 'Number', 'Boolean'] as Typing[]).forEach(type => {
    utils['is' + type] = isType(type) // 闭包
})
console.log(utils.isString('111'))


// 思考如何将多个参数的函数柯里化转成多个单参数的函数
// 参数缓存，依次往后传
// 标准版版，返回一个暂存上次参数的函数，需要连续调用。
function curring(fn) {
    const exec = (...args) => {
        // 判断传人的参数的长度如果小于函数的长度，需要返回一个新的函数，并保留当前函数传人的参数
        return args.length >= fn.length ? fn(...args) : (...args2) => exec(...args, ...args2)
    }
    return exec
}

function sum(a, b, c, d) { // 参数固定的时候做柯里化
    return a + b + c + d;
}

const sum1 = sum(1, 2, 3, 4)
const sum2 = curring(sum)(1)(2, 3)(4)
console.log(sum1, sum2)

// 通过闭包保存上次调用的参数，
function curring2(fn) {
    let arr = []
    const exec = (...x) => {
        arr.push(...x)
        return arr.length >= fn.length ? fn(...arr) : (...y) => exec(...y)
    }
    return exec
}
const sum3 = curring2(sum)
sum3(1)
sum3(2,3)
console.log(sum3(4))





