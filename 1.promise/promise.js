'use strict';

// 核心的逻辑：解析x的类型，来决定promise走成功还是失败
function resolvePromise(promise2, x, resolve, reject) {
    // 判断x的类型决定和promise2的状态关系，普通值，promise（自己的或者别人的promise）
    // 如果x和promise引用了同一个，循环引用，抛出错误
    if (promise2 == x) {
        return reject(new TypeError('出错了'));
    }
    // 为什么不能用instanceof ，因为返回的promise不一定是同一个Promise构造的
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        // 只有x是对象或者是才有可肯是promise
        var called_1 = false; // 表示没调用过成功或失败，避免其他的promise同一次回调内部实现多次调用成功或失败。
        try {
            var then = x.then;
            if (typeof then === 'function') {
                // 为什么不用 x.then.call(...) ? 会再次触发get
                then.call(x, function (y) {
                    // 此处的y可能还是Promise，需要递归调用。直到是普通值
                    // resolve(y)
                    if (called_1)
                        return;
                    called_1 = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, function (r) {
                    if (called_1)
                        return;
                    called_1 = true;
                    reject(r);
                });
            }
            else {
                if (called_1)
                    return;
                called_1 = true;
                resolve(x);
            }
        }
        catch (e) {
            if (called_1)
                return;
            called_1 = true;
            reject(e);
        }
    }
    else {
        // 普通值
        resolve(x);
    }
}
function isPromise(x) {
    if ((typeof x === 'object' && typeof x !== null) || typeof x === 'function') {
        return typeof x.then === 'function';
    }
    else {
        return false;
    }
}
var Promise$1 = /** @class */ (function () {
    function Promise(executor) {
        var _this = this;
        this.status = "PENDING" /* pending */;
        this.value = undefined;
        this.reason = undefined;
        this.onResolveCallbacks = [];
        this.onRejectedCallbacks = [];
        var resolve = function (value) {
            // 如果value也是一个promise，规范只要求兼容自己的promise
            if (value instanceof Promise) {
                return value.then(resolve, reject);
            }
            if (_this.status === "PENDING" /* pending */) {
                _this.status = "FULFILLED" /* fulfilled */;
                _this.value = value;
                _this.onResolveCallbacks.forEach(function (fn) { return fn(); });
            }
        };
        var reject = function (reason) {
            if (_this.status === "PENDING" /* pending */) {
                _this.status = "REJECTED" /* rejected */;
                _this.reason = reason;
                _this.onRejectedCallbacks.forEach(function (fn) { return fn(); });
            }
        };
        try {
            executor(resolve, reject);
        }
        catch (e) {
            reject(e);
        }
    }
    Promise.deferred = function () {
        var dfd = {};
        dfd.promise = new Promise(function (resolve, reject) {
            dfd.resolve = resolve;
            dfd.reject = reject;
        });
        return dfd;
    };
    Promise.all = function (values) {
        return new Promise(function (resolve, reject) {
            var arr = [];
            var times = 0;
            function collectResult(val, key) {
                arr[key] = val;
                if (++times === values.length) {
                    resolve(arr);
                }
            }
            var _loop_1 = function (i) {
                var value = values[i];
                if (isPromise(value)) {
                    value.then(function (y) {
                        // y i
                        collectResult(y, i);
                    }, reject);
                }
                else {
                    // value i
                    collectResult(value, i);
                }
            };
            for (var i = 0; i < values.length; i++) {
                _loop_1(i);
            }
        });
    };
    Promise.prototype.then = function (onFulfilled, onRejected) {
        var _this = this;
        // 处理值的穿透
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (val) { return val; };
        onRejected = typeof onRejected === 'function' ? onRejected : function (err) {
            throw (err);
        };
        var promise2 = new Promise(function (resolve, reject) {
            // new Promise时会立即执行，
            if (_this.status === "FULFILLED" /* fulfilled */) {
                setTimeout(function () {
                    try {
                        var x = onFulfilled(_this.value);
                        // resolve(x)
                        // 规范要求resolvePromise只有前两个参数，此处为了方便多传人俩个,resolve, reject都是promise2的回调
                        // promise2.resolve = resolve
                        // promise2.reject = reject
                        // 此时promise2其实是不存在的，需要延迟加载,此处用setTimeout。事件循环
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                }, 0);
            }
            if (_this.status === "REJECTED" /* rejected */) {
                setTimeout(function () {
                    try {
                        var x = onRejected(_this.reason);
                        // 注意这里then里的失败回调返回的普通值也会走到下一个promise的成功回调里
                        // resolve(x)
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                }, 0);
            }
            if (_this.status === "PENDING" /* pending */) {
                // 暂存onFulfilled和onRejected
                // 发布订阅模式处理异步
                _this.onResolveCallbacks.push(function () {
                    // todo 额外的逻辑，切片编程
                    setTimeout(function () {
                        try {
                            var x = onFulfilled(_this.value);
                            // resolve(x)
                            resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
                _this.onRejectedCallbacks.push(function () {
                    setTimeout(function () {
                        try {
                            var x = onRejected(_this.reason);
                            // resolve(x)
                            resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
            }
        });
        return promise2;
    };
    Promise.prototype.catch = function (errCallback) {
        return this.then(null, function (err) { return errCallback(err); });
    };
    Promise.resolve = function (value) {
        return new Promise(function (resolve, reject) {
            resolve(value);
        });
    };
    Promise.reject = function (value) {
        return new Promise(function (resolve, reject) {
            reject(value);
        });
    };
    // finally返回的值不会影响后面的
    Promise.prototype.finally = function (callback) {
        // 谁调了
        return this.then(function (data) {
            return Promise.resolve(callback(data)).then(function () { return data; });
        }, function (err) {
            return Promise.resolve(callback(err)).then(function () {
                throw (err);
            });
        });
    };
    Promise.race = function (values) {
        return new Promise(function (resolve, reject) {
            for (var i = 0; i < values.length; i++) {
                var value = values[i];
                if (isPromise(value)) {
                    value.then(resolve, reject);
                }
                else {
                    resolve(value);
                }
            }
        });
    };
    return Promise;
}());

module.exports = Promise$1;
