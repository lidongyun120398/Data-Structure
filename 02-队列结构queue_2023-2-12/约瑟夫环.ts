import ArrayQueue from "./ArrayQueue";

function lastRemaining(n:number,m:number){
    const queue = new ArrayQueue<number>()

    for(let i = 0;i < n;i++){
        queue.enqueue(i)
    }

    while (queue.size() > 1){
        for(let j = 1;j < m;j++){
            queue.enqueue(queue.dequeue())
        }
        queue.dequeue()
    }

    return queue.dequeue()
}

// console.log(lastRemaining(10,17))