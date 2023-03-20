import ArrayQueue from "./ArrayQueue";

function hotPotato(names: string[],number: number): number{
    const queue = new ArrayQueue<string>()

    for(const item of names){
        queue.enqueue(item)
    }

    while (queue.size() > 1) {
        for(let i = 1;i < number; i++ ){
            queue.enqueue(queue.dequeue())
        }
        queue.dequeue()
    }

    //返回最后一个留在队列中的元素
    // return queue.dequeue()

    const leftName = queue.dequeue()!
    const index = names.indexOf(leftName)

    return index

}


// const leftIndex = hotPotato(["abc","bca","asd","npm","npx","cde"],4)
// console.log(leftIndex)