
const fs = require('fs');
const path = require('path');
// 发布订阅模式：把需要做的事情放到一个数组里，等会儿发生了让订阅的事件依次执行

// 发布订阅模式：发布--（中介）---订阅
// 发布和订阅直接没有直接的关联
class Events {
    events:{}
    obj:Record<string,any>
    constructor(){
        this.events = [] // 中介
        this.obj = {}
    }
    on(fn){
        this.events.push(fn)
    }
    emit(key,val){
        this.obj[key] = val
        this.events.forEach(fn=>{
            fn(this.obj)
        })
    }
}
const evt = new Events()


// let obj = {}
// 订阅
evt.on((obj)=>{
    if(Object.keys(obj).length >=2){
        console.log(obj)
    }
})

// 发布订阅模式
fs.readFile(path.resolve(__dirname,'./name.txt'),'utf8',(err,data)=>{
    // obj.name = data
    evt.emit('name',data)
})
fs.readFile(path.resolve(__dirname,'./age.txt'),'utf8',(err,data)=>{
    // obj.age = data
    evt.emit('age',data)
})

export {}

