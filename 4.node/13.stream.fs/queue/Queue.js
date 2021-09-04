const LinkList = require('./LinkList');

class Queue {
    constructor() {
        this.linkList = new LinkList()
    }

    push(value) {
        this.linkList.add(value)
    }

    shift() {
        this.linkList.remove(0)
    }
}
module.exports = Queue
