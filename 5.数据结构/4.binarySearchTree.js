// 树的应用：文件夹目录 Dom结构 路由配置 权限
// 一般：深度递归，广度遍历
// binary search tree
class Node {
    constructor(element, parent) {
        this.element = element;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor(_compare) {
        this.root = null;
        this._compare = _compare || this._compare
    }

    _compare(x, y) {
        return x >= y
    }

    add(element) {
        if (this.root === null) {
            return this.root = new Node(element, null);
        }
        let currentNode = this.root;
        let parent = this.root;
        while (currentNode) {
            parent = currentNode;
            if (this._compare(currentNode.element, element)) {
                // 放左边
                currentNode = currentNode.left;
                // currentNode.left = new Node(element, currentNode)
            } else {
                // 放右边
                currentNode = currentNode.right;
                // currentNode.right = new Node(element, currentNode)
            }
        }
        if (this._compare(parent.element, element)) {
            parent.left = new Node(element, parent)
        } else {
            parent.right = new Node(element, parent)
        }
    }
}

module.exports = BinarySearchTree
// let tree = new BinarySearchTree()
// tree.add(8)
// tree.add(2)
// tree.add(19)
// tree.add(15)
// tree.add(4)
// tree.add(10)
// tree.add(7)
// console.dir(tree, {depth: 100})
