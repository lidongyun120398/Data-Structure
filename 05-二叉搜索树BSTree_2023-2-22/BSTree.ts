import {btPrint} from 'hy-algokit'

//节点类
class treeNode<T> {
    value: T
    left:treeNode<T> | null = null
    right:treeNode<T> | null = null
    parent:treeNode<T> | null = null
    constructor(value:T){
        this.value = value 
    }

    get isLeft():boolean{
        return !!(this.parent && this.parent.left === this)
    }

    get isRight():boolean{
        return !!(this.parent && this.parent.right === this)
    }
}

//二叉搜索树类
class BSTree<T> {
    private root: treeNode<T> | null = null

    print(){
        btPrint(this.root)
    }

    insert(value:T){
        const newNode = new treeNode(value)

        if(!this.root){
            this.root = newNode 
        }else{
            this.insertNode(this.root,newNode)
        }
    }

    private insertNode(node:treeNode<T>,newNode:treeNode<T>){
        //小于向左插入
        if(node.value > newNode.value){
            if(node.left === null){
                node.left = newNode
            }else{
                this.insertNode(node.left,newNode)
            }
        } else {
            //大于向右插入
            if(node.right === null){
                node.right = newNode
            }else{
                this.insertNode(node.right,newNode)
            }
        }
    }

    private searchNode(value:T){
        let current = this.root
        let parent: treeNode<T> | null = null
        while(current){
            if(current.value === value) return current

            parent = current
            if(current.value < value){
                current = current.right
            }else{
                current = current.left
            }
            if(current) current.parent = parent
        }
        
        return null
    }
    //中序遍历:先左后根再右
    private inOrderTraverseNode(node:treeNode<T> | null){
        if(node){
            this.inOrderTraverseNode(node.left)
            console.log(node.value)
            this.inOrderTraverseNode(node.right)
        }
    }   
    inOrderTraverse(){
        this.inOrderTraverseNode(this.root)
    }

    //先序遍历:先根后左再右
    private preOrderTraverseNode(node:treeNode<T> | null){
        if(node){
            console.log(node.value)
            this.preOrderTraverseNode(node.left)
            this.preOrderTraverseNode(node.right)
        }
    }
    preOrderTraverse(){
        this.preOrderTraverseNode(this.root)
    }

    //后序遍历：先左后右再根
    private postOrderTraverseNode(node:treeNode<T> | null){
        if(node){
            this.postOrderTraverseNode(node.left)
            this.postOrderTraverseNode(node.right)
            console.log(node.value)
        }
    }
    postOrderTraverse(){
        this.postOrderTraverseNode(this.root)
    }

    //层序遍历：利用队列
    levelOrderTraver(){
        if(!this.root) return 

        const queue : treeNode<T>[] = []
        queue.push(this.root)

        while(queue.length){
            const node = queue.pop()!
            console.log(node.value)


            if(node.left){
                queue.push(node.left)
            }

            if(node.right){
                queue.push(node.right)
            }
        }
    }


    search(value: T): boolean{
        return !!this.searchNode(value)
    }

    getMaxValue(): T | null{
        let current = this.root
        while(current && current.right){
            current = current.right
        }
        return current?.value ?? null
    }

    getMinValue(): T | null{
        let current = this.root
        while(current && current.left){
            current.left
        }
        return current?.value ?? null
    }

    private getSuccessor(delNode: treeNode<T>): treeNode<T>{
        let current = delNode.right
        let successor: treeNode<T> | null = null
        while(current){
            successor = current
            current = current.left
            if(current){
                current.parent = successor
            }
        }
        
        if(successor !== delNode.right){
            successor!.parent!.left = successor!.right
            successor!.right = delNode.right
        }

        successor!.left = delNode.left
        
        return successor!
    }

    //删除节点：1.是叶节点 2.含有一个子节点 3.含有两个子节点
    remove(value:T):boolean{
        const current = this.searchNode(value)
        if(!current) return false

        //current为叶子结点的情况
        if(current.right === null && current.left === null){
            if(current === this.root){
                this.root = null
            }else if(current.isLeft){
                current.parent!.left = null
            }else{
                current.parent!.right = null
            }
        }

        //current有一个节点的情况
        else if(current.right === null){
            if(current === this.root){
                this.root = current.left
            }else if(current.isLeft){
                current.parent!.left = current.left
            }else{
                current.parent!.right = current.left
            }
        }
        else if(current.left === null){
            if(current === this.root){
                this.root = current.right
            }else if(current.isLeft){
                current.parent!.left = current.right
            }else{
                current.parent!.right = current.right
            }
        }

        //current有两个节点的情况
        else{
            const successor = this.getSuccessor(current)
            if(current === this.root){
                this.root = successor
            }else if(current.isLeft){
                current.parent!.left = successor
            }else{
                current.parent!.right = successor
            }
        }

        return true
    }

}

const bst = new BSTree<number>()

bst.insert(11)
bst.insert(7)
bst.insert(15)
bst.insert(5)
bst.insert(3)
bst.insert(9)
bst.insert(8)
bst.insert(10)
bst.insert(13)
bst.insert(12)
bst.insert(14)
bst.insert(20)
bst.insert(18)
bst.insert(25)
bst.insert(6)

bst.print()


// bst.remove(7)
// bst.print()


export {}