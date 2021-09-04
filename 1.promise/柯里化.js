// const curring = () => {
//     let arr = [];
//     const add = (...params) => {
//         // arr = arr.concat(params);
//         arr.push(...params);
//         return add;
//     };
//     add.toString = () => {
//         return arr.reduce((total, item) => {
//             return total + item;
//         });
//     };
//     return add;
// };
//
// const sum = (a,b,c,d) => a+b+c+d
//
// let add = curring();
// let res = add(1)(2)(3);
// console.log(res.toString()); //->6
//
// add = curring();
// res = add(1, 2, 3)(4);
// console.log(res.toString()); //->10
//
// add = curring();
// res = add(1)(2)(3)(4)(5);
// console.log(res.toString()); //->15

function curring(func) {
    return function exec(...args) {
        return args.length >= func.length ? func.apply(this, args) : (...args2) => exec(...args, ...args2)
    }
}

function sum(a, b, c, d) {
    return a + b + c + d
}

console.log(curring(sum)(1)(2, 3, 4))
