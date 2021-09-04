let a = 'wang bingyang'
console.count(a)
let c = {
    num:1
}
// exports = '1235' //这样对module.exports无影响
exports.a = '355433' //

setTimeout(() => {
    c.num += 1
})
exports.c = c
module.exports.b = a


