const url = require('url');
//
let ctx = {}

function defineGetter(target, key) {
    ctx.__defineGetter__(key, function () {

        // ctx.__proto__.__proto__ = ctx
        return this[target][key]
    });
}
function defineSetter(target, key) {
    ctx.__defineSetter__(key, function (value) {
        this[target][key] = value
    })
}

defineGetter('request', 'url')
defineGetter('request', 'path')
defineGetter('response', 'body')
defineSetter('response', 'body')

// var o = {};
// o.__defineGetter__('gimmeFive', function() { return 5; });
// console.log(o.gimmeFive); // 5

// this. 为啥是两层后的 没听明白
// ctx.__defineGetter__('url', function () {
//
//     // ctx.__proto__.__proto__ = ctx
//     return this.request.url
// });
// ctx.__defineGetter__('path', function () {
//     return this.request.path
// })
module.exports = ctx;
