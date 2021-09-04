// 之前ReadStream内有个cache缓存队列
// 队列：先进先出 ，队尾push，对头shift，
// 栈 ：后进先出 ，队尾push，队尾pop，
// 数组实现的队列 出队性能低,塌陷
// 链表实现的队列

// 队列应用：事件循环
// 栈应用：路由管理、历史记录
class Node {
    constructor(element, next) {
        this.element = element;
        this.next = next;
    }
}

/**
 * add(index,element)  指定索引添加元素
 * add(element)  直接添加元素
 * get(index)  获取指定索引元素
 * set(index,element) 修改指定索引节点内容
 * remove(index) 删除指定索引节点
 * clear() 清空链表
 *
 */
class LinkedList {
    constructor() {
        this.size = 0;
        this.head = null;
    }

    _node(index) {
        if (index < 0 || index >= this.size) throw new Error('越界');
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    }

    add(index, element) {
        if (arguments.length === 1) {
            element = index;
            index = this.size;
        }
        if (index < 0 || index > this.size) throw new Error('越界');
        if (index === 0) {
            let head = this.head;
            this.head = new Node(element, head);
        } else {
            let prevNode = this._node(index - 1);
            prevNode.next = new Node(element, prevNode.next);
        }
        this.size++;
    }

    get(index) {
        return this._node(index);
    }

    set(index, element) {
        let node = this._node(index);
        node.element = element;
        return node;
    }

    remove(index) {
        if (index < 0 || index >= this.size) throw new Error('越界');
        if (index === 0) {
            this.head = this.head.next;
        } else {
            let prevNode = this._node(index - 1);
            prevNode.next = prevNode.next.next;
        }
        this.size--;
    }

    clear() {
        this.size = 0;
        this.head = null;
    }

    reverse() {
        function reverse(head) {
            if (head === null || head.next === null) return head;
            let newHead = reverse(head.next)
            head.next.next = head;
            head.next = null
            return newHead
        }

        this.head = reverse(this.head)
    }
}
module.exports = LinkedList

// let l1 = new LinkList()

// let l2 = new LinkList()
// for (let i = 1; i <= 5; i++) {
//     // l1.add(0, i)
//     l2.add(i)
// }
// // console.dir(l1, {depth: 1000})
// // console.dir(l2, {depth: 1000})
// l2.add(6)
// console.log(l2.remove(1))
// l2.set(1,10)
// console.dir(l2, {depth: 1000})

