const STATUS = {
    pending: 'PENDING',
    fulfilled: 'FULFILLED',
    rejected: 'REJECTED'
}

function isPromise(x) {
    if (typeof x === 'object' && x !== null || typeof x === 'function') {
        return typeof x.then === 'function';
    } else {
        return false;
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    // promise2 x的关系
    if (promise2 === x) {
        return reject(new TypeError('循环引用错误'))
    }
    if (typeof x === 'object' && x !== null || typeof x === 'function') {
        let called = false;
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return
                    called = true;
                    resolvePromise(promise2, y, resolve, reject)
                }, d => {
                    if (called) return
                    called = true;
                    reject(d)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) return
            called = true;
            reject(e)
        }
    } else {
        resolve(x)
    }
}

class Promise {
    constructor(executor) {
        this.status = STATUS.pending
        this.value = undefined;
        this.reason = undefined;
        this.fulfilledCallbacks = [];
        this.rejectedCallbacks = []
        const resolve = (value) => {
            this.value = value
            this.status = STATUS.fulfilled;
            this.fulfilledCallbacks.forEach(fn => fn());
        }
        const reject = (reason) => {
            this.reason = reason;
            this.status = STATUS.rejected;
            this.rejectedCallbacks.forEach(fn => fn())
        }
        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (data) => data;
        onRejected = typeof onRejected === 'function' ? onRejected : (err) => {
            throw(err)
        };
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === STATUS.fulfilled) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
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
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.status === STATUS.pending) {
                this.fulfilledCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
                this.rejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
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

    static deferred() {
        let dfd = {}
        dfd.promise = new Promise((resolve, reject) => {
            dfd.resolve = resolve;
            dfd.reject = reject
        })
        return dfd
    }

    static all(values) {
        return new Promise((resolve, reject) => {
            let arr = []
            let times = 0

            function collectResult(key, value) {
                arr[key] = value
                if (++times >= values.length) {
                    resolve(arr)
                }
            }

            for (let i = 0; i < values.length; i++) {
                let value = values[i]
                if (isPromise(value)) {
                    value.then(data => {
                        collectResult(i, data)
                    }, err => {
                        reject(err)
                    })
                } else {
                    collectResult(i, value)
                }
            }


        })
    }

    catch(errCallback) {
        return this.then(null, err => errCallback(err))
    }
}

module.exports = Promise

let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() > 0.5) {
            resolve('ok')
        } else {
            reject('err')
        }
    })
})
promise.then(data => {
    console.log(data)
    return 'ok1'
}, err => {
    console.log(err)
    return 'err1'
}).then(data => {
    console.log(data)
}, err => {
    console.log(err)
})
