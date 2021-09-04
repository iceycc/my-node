const enum STATUS {
    pending = 'PENDING',
    fulfilled = 'FULFILLED',
    rejected = 'REJECTED'
}

// 核心的逻辑：解析x的类型，来决定promise走成功还是失败
function resolvePromise(promise2, x, resolve, reject) {
    // 判断x的类型决定和promise2的状态关系，普通值，promise（自己的或者别人的promise）
    // 如果x和promise引用了同一个，循环引用，抛出错误
    if (promise2 == x) {
        return reject(new TypeError('出错了'))
    }
    // 为什么不能用instanceof ，因为返回的promise不一定是同一个Promise构造的
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        // 只有x是对象或者是才有可肯是promise
        let called = false; // 表示没调用过成功或失败，避免其他的promise同一次回调内部实现多次调用成功或失败。
        try {
            let then = x.then
            if (typeof then === 'function') {
                // 为什么不用 x.then.call(...) ? 会再次触发get
                then.call(x, y => {
                    // 此处的y可能还是Promise，需要递归调用。直到是普通值
                    // resolve(y)
                    if (called) return
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, r => {
                    if (called) return
                    called = true
                    reject(r)
                })
            } else {
                if (called) return
                called = true
                resolve(x)
            }
        } catch (e) {
            if (called) return
            called = true
            reject(e)
        }

    } else {
        // 普通值
        resolve(x)
    }
}

function isPromise(x) {
    if ((typeof x === 'object' && typeof x !== null) || typeof x === 'function') {
        return typeof x.then === 'function';
    } else {
        return false
    }
}

class Promise {
    status: STATUS
    value: unknown;
    reason: unknown;
    onResolveCallbacks: Array<Function>;
    onRejectedCallbacks: Array<Function>;

    static deferred() {
        let dfd = {} as any;
        dfd.promise = new Promise((resolve, reject) => {
            dfd.resolve = resolve;
            dfd.reject = reject;
        })
        return dfd;
    };

    static all(values) {
        return new Promise((resolve, reject) => {
            let arr = []
            let times = 0;

            function collectResult(val, key) {
                arr[key] = val;
                if (++times === values.length) {
                    resolve(arr)
                }
            }

            for (let i = 0; i < values.length; i++) {
                let value = values[i]
                if (isPromise(value)) {
                    value.then(y => {
                        // y i
                        collectResult(y, i)
                    }, reject)
                } else {
                    // value i
                    collectResult(value, i)
                }
            }
        })
    };

    constructor(executor: (resolve: (value?: unknown) => void, reject: (reason?: unknown) => void) => void) {
        this.status = STATUS.pending;
        this.value = undefined;
        this.reason = undefined;
        this.onResolveCallbacks = [];
        this.onRejectedCallbacks = [];
        const resolve = (value?: unknown) => {
            // 如果value也是一个promise，规范只要求兼容自己的promise
            if (value instanceof Promise) {
                return value.then(resolve, reject)
            }
            if (this.status === STATUS.pending) {
                this.status = STATUS.fulfilled;
                this.value = value;
                this.onResolveCallbacks.forEach(fn => fn())
            }
        }
        const reject = (reason?: unknown) => {
            if (this.status === STATUS.pending) {
                this.status = STATUS.rejected;
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }
        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }

    then(onFulfilled?, onRejected?) {
        // 处理值的穿透
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
        onRejected = typeof onRejected === 'function' ? onRejected : err => {
            throw(err)
        }
        let promise2 = new Promise((resolve, reject) => {
            // new Promise时会立即执行，
            if (this.status === STATUS.fulfilled) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        // resolve(x)
                        // 规范要求resolvePromise只有前两个参数，此处为了方便多传人俩个,resolve, reject都是promise2的回调
                        // promise2.resolve = resolve
                        // promise2.reject = reject

                        // 此时promise2其实是不存在的，需要延迟加载,此处用setTimeout。事件循环
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)

            }
            if (this.status === STATUS.rejected) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        // 注意这里then里的失败回调返回的普通值也会走到下一个promise的成功回调里
                        // resolve(x)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.status === STATUS.pending) {
                // 暂存onFulfilled和onRejected
                // 发布订阅模式处理异步
                this.onResolveCallbacks.push(() => {
                    // todo 额外的逻辑，切片编程
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value)
                            // resolve(x)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            // resolve(x)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
            }
        })
        return promise2
    }

    catch(errCallback) {
        return this.then(null, err => errCallback(err))
    }

    static resolve(value) {
        return new Promise((resolve, reject) => {
            resolve(value)
        })
    }

    static reject(value) {
        return new Promise((resolve, reject) => {
            reject(value)
        })
    }

    // finally返回的值不会影响后面的
    finally(callback) {
        // 谁调了
        return this.then((data) => {
            return  Promise.resolve(callback(data)).then(() => data)
        }, err => {
            return Promise.resolve(callback(err)).then(() => {
                throw(err)
            })
        })
    }
    static race(values){
        return new Promise((resolve,reject)=>{
            for(let i=0;i<values.length;i++){
                let value = values[i]
                if(isPromise(value)){
                    value.then(resolve,reject)
                }else{
                    resolve(value)
                }
            }
        })
    }
}


export default Promise
