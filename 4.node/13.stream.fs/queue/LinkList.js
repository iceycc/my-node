class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkList {
    constructor() {
        this.head = new Node(null)
        this.size = 0
    }

    isEmpty() {
        return this.size === 0
    }

    _find(index) {
        let current = this.head
        while (index--) {
            current = current.next
        }
        return current
    }

    add(index, value) {
        if (arguments.length === 1) {
            value = index;
            index = this.size
        }
        if (index === 0) {
            let head = this.head;
            this.head = new Node(value)
            this.head.next = head;
        } else {
            let target = this.get(index - 1)
            target.next = new Node(value)
        }
        this.size++
    }

    remove(index) {
        let removeNode;
        if (index === 0) {
            removeNode = this.head;
            this.head = this.head.next;
        } else {
            let preNode = this._find(index - 1)
            removeNode = preNode.next;
            preNode.next = preNode.next.next;
        }
        this.size--;
        return removeNode.value
    }

    set(index, value) {
        let node = this._find(index);
        node.value = value
        return node;
    }

    get(index) {
        return this._find(index)
    }
}
module.exports = LinkList
