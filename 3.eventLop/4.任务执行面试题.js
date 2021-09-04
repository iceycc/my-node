console.log(1);
async function async () {
    console.log(2);
    await console.log(3);
    console.log(4)
}
setTimeout(() => {
    console.log(5);
}, 0);
const promise = new Promise((resolve, reject) => {
    console.log(6);
    resolve(7)
})
promise.then(res => {
    console.log(res)
})
async ();
console.log(8);

//
// w ['7','3']
// h ['5']
//
// 1 6 2 3 8 7 4 5

// 面试  单元测试
// 浏览器的事件环


