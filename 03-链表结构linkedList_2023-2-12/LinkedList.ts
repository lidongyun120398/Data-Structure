import ILink from "./ILink"

//创建一个生成节点的类
class Node<T> {
    value: T
    next: Node<T> | null = null
    constructor(value : T){
        this.value = value
    }
}

class linkedList<T> implements ILink<T> {

    head : Node<T> | null = null
    private length : number = 0

    get size(){
        return this.length
    }

    private getNode(position: number): Node<T> | null{
        let index = 0
        let current = this.head 
        while(index++ < position && current){
            current = current.next
        }
        return current
    }

    append(value: T): void {
        const newNode = new Node(value)

        if(!this.head){
            this.head = newNode
        }else{
            let current = this.head
            while(current.next){
                current = current.next
            }

            current.next = newNode
        }
        this.length++
    }
    insert(position: number, value: T): boolean {
        const newNode = new Node(value)

        if(position < 0 || position > this.length) return false

        if(position === 0){
            newNode.next = this.head
            this.head = newNode
        }else{
            const previous = this.getNode(position - 1)
            newNode.next = previous!.next
            previous!.next = newNode
        }
        this.length++

        return true
    }
    get(position: number): T | null {
        if(position < 0 || position > this.length) return null

        const current = this.getNode(position)
        return current?.value ?? null
    }
    indexOf(value: T): number {
        let current = this.head
        let index = 0
        while(current){
            if(current.value === value){
                return index
            }
            current = current.next
            index++
        }
        return -1
    }
    update(position: number, value: T): boolean {
        if(position < 0 || position > this.length) return false

        const current = this.getNode(position)
        current!.value = value
        return true
    }
    removeAt(position: number): T | null {
        if(position < 0 || position > this.length) return null
        
        let current = this.head
        if(position === 0){
            this.head = this.head!.next
        }else{
            const previous = this.getNode(position - 1)
            previous!.next = previous?.next?.next ?? null
        }
        this.length--
        return current?.value ?? null

    }
    remove(value: T): T | null {
        const index = this.indexOf(value)
        return this.removeAt(index)
    }
    isEmpty(): boolean {
        return this.length === 0
    }
    traverse() {
        const value: T[] = []

        let current = this.head
        while(current){
            value.push(current.value)
            current= current.next
        }
        console.log(value.join("->"))
    }
    


}

export default linkedList