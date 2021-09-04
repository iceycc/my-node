const LinkedList = require('./1.LinkedList');
class Queue {
    constructor(){
        this.ll = new LinkedList()
    }
    add(value){ // 队尾添加
        this.ll.add(value)
    }
    offer(){ // 对头删除
        this.ll.remove(0)
    }
}
let queue = new Queue()
queue.add(1)
queue.add(2)
queue.offer()
console.dir(queue,{depth:1000})
