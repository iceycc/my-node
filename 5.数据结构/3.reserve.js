const LinkedList = require('./1.LinkedList')

let l1 = new LinkedList()
l1.add(0)
l1.add(1)
l1.add(2)
l1.add(3)
l1.add(4)
l1.add(5)

console.dir(l1, {depth: 10})

function reverseLinkedList(l1) {
    function reverse(head) {
        if (head === null || head.next === null) {
            return head;
        }
        let newHead = reverse(head.next)
        head.next.next = head;
        head.next = null;
        return newHead
    }

    l1.head = reverse(l1.head)
}

reverseLinkedList(l1)
console.dir(l1, {depth: 10})
l1.reverse()
console.dir(l1, {depth: 10})

function reverseLinkedList2(l1) {
    let head = l1.head
    let newHead = null
    while (head !== null) {
        let temp = head.next
        head.next = newHead
        newHead = head
        head = temp
    }
    l1.head = newHead
    return newHead
}

reverseLinkedList2(l1)
console.dir(l1, {depth: 10})
