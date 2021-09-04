// 树的四种遍历方式
// 深度 广度
// 先序 中序 后序 层序
const BinarySearchTree = require('./4.binarySearchTree')

let tree = new BinarySearchTree((x, y) => {
    return (x.id || x) >= (y.id || y)
})
tree.add({id: 8, name: 't8'})
tree.add({id: 2, name: 't2'})
tree.add({id: 19, name: 't19'})
tree.add({id: 15, name: 't15'})
tree.add({id: 4, name: 't4'})
tree.add({id: 10, name: 't10'})
tree.add({id: 7, name: 't7'})

// console.dir(tree, {depth: 100})

function preOrder(root, callback) {
    if (root === null) return
    callback && callback(root)
    preOrder(root.left, callback)
    preOrder(root.right, callback)
}

function preOrder2(root, callback) {
    let stack = [];
    stack.push(root)
    while (stack.length) {
        let node = stack.pop()
        callback(node)
        if (node.right !== null) {
            stack.push(node.right)
        }
        if (node.left !== null) {
            stack.push(node.left)
        }

    }
}

console.log('----preOrder---')
preOrder(tree.root, (node) => {
    console.log(node.element.id)
})
console.log('----preOrder2---')
preOrder2(tree.root, (node) => {
    console.log(node.element.id)
})

function inOrder(root, callback) {
    if (root === null) return
    inOrder(root.left, callback)
    callback && callback(root)
    inOrder(root.right, callback)
}

function inOrder2(root, callback) {
    let stack = []
    let current = root
    while (current !== null || stack.length !== 0) {
        while (current !== null) {
            stack.push(current)
            current = current.left;
        }
        current = stack.pop()
        callback && callback(current)
        current = current.right;
    }
}

console.log('-----inOrder--------')
inOrder(tree.root, (node) => {
    console.log(node.element.id)
})
console.log('-------inOrder2------')
inOrder2(tree.root, (node) => {
    console.log(node.element.id)
})

function postOrder(root, callback) {
    if (root === null) return
    postOrder(root.left, callback)
    postOrder(root.right, callback)
    callback && callback(root)
}
//
// function postOrder2(root, callback) {
//     let stack = []
//     let current = root
//     let top = null, last = null
//     while (stack.length !== 0 || current !== null) {
//         while (current !== null) {
//             stack.push(current)
//             current = current.left
//         }
//         top = stack[0];
//         // console.log(top)
//         if (top.right === null || top.right === last) {
//             callback && callback(top)
//             stack.pop()
//             last = top
//         } else {
//             current = top.right
//         }
//
//     }
// }

console.log('-------postOrder------')
postOrder(tree.root, (node) => {
    console.log(node.element.id)
})
console.log('----postOrder2---------')
// postOrder2(tree.root, (node) => {
//     console.log(node.element.id)
// })

function levelOrder(root, callback) {
    if (root === null) return
    let stack = [root]
    let currentNode = null
    let index = 0
    while (currentNode = stack[index++]) {
        callback && callback(currentNode)
        if (currentNode.left) {
            stack.push(currentNode.left)
        }
        if (currentNode.right) {
            stack.push(currentNode.right)
        }
    }
}
//
// levelOrder(tree.root, (node) => {
//     // console.log(node.element)
//
// })
