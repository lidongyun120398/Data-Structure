import IStack from "./IStack"


class arrayStack<T> implements IStack<T> {

    private data : T[] = []

    push(element: T): void {
        this.data.push(element)
    }
    pop(): T | undefined {
        return this.data.pop()
    }
    peek(): T | undefined {
        return this.data[this.data.length - 1]
    }
    isEmpty(): boolean {
        return this.data.length === 0
    }
    size(): number {
        return this.data.length
    }

}

export default arrayStack

// const stack = new arrayStack<number>()
// stack.push(1)
// stack.push(3)
// stack.push(5)
// stack.push(7)
// console.log(stack.peek())
// console.log(stack.isEmpty())
// console.log(stack.size())
// console.log(stack.pop())
// console.log(stack.pop())
// console.log(stack.peek())
// console.log(stack.isEmpty())
// console.log(stack.size())
// console.log(stack.pop())
// console.log(stack.pop())
// console.log(stack.size())
// console.log(stack.isEmpty())

