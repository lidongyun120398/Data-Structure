import ListNode from './面试题_listNode'

function reverseLinkedList(head : ListNode | null): ListNode | null {
    //如果链表中没有值或者只有head直接返回
    if(head === null || head.next === null) return head
    //生成栈结构
    const stack : ListNode[] = []
    
    let current : ListNode | null = head
    while(current){
        stack.push(current)
        current = current.next
    }
    //让新的head等于栈顶
    const newHead: ListNode = stack.pop()!
    let newHeadCurrent = newHead

    while(stack.length){
        let node = stack.pop()!
        newHeadCurrent.next = node
        newHeadCurrent = newHeadCurrent.next
    }
    //最后要把current的关系清掉，不然就回无限循环指回自己
    newHeadCurrent.next = null

    return newHead
    
}