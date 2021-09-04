class Events {
    constructor() {
        this._events = {}
    }

    on(eventName, callback) {
        if (!this._events) this._events = {} // 没有的话加一个。。。。
        if (eventName !== 'newListener') {
            this.emit('newListener', eventName)
        }
        if (this._events[eventName]) {
            this._events[eventName].push(callback)
        } else {
            this._events[eventName] = [callback]
        }
    }

    emit(eventName, ...args) {
        if (this._events[eventName]) {
            this._events[eventName].forEach(fn => fn(...args))
        }
    }

    off(eventName, callback) {
        // 匿名函数无法off
        if (!this._events) this._events = {}
        if (this._events[eventName]) {
            this._events[eventName] = this._events[eventName].filter(fn => fn !== callback && fn.callback !== callback)
        }
    }

    offAll(eventName) {
        if (this._events[eventName]) delete this._events[eventName]
    }

    once(eventName, callback) {
        // aop切片
        const once = () => {
            callback();
            this.off(eventName, once)
        }
        once.callback = callback // 如果once之后马上off，需要进行标记，因为函数注册的回调函数已经变了。
        this.on(eventName, once)
    }
}

// function Events() {
//     this._events = {}
// }
//
// Events.prototype.on = function (name, callback) {
//     if(!this._events) this._events = {}
//     if (this._events[name]) {
//         this._events[name].push(callback)
//     } else {
//         this._events[name] = [callback]
//     }
// }
// Events.prototype.emit = function (name, ...args) {
//     if (this._events[name]) {
//         this._events[name].forEach(fn => fn(...args))
//     }
// }

module.exports = Events
