import ListNode from './面试题_listNode'

function reverseLinkedList(head : ListNode | null): ListNode | null {
    if(head === null || head.next === null) return head


    let newHead: ListNode | null = null 
    let current: ListNode | null = head
    while(current){
        current = head!.next
        head!.next = newHead
        newHead = head
        head = current
    }
    return newHead
}


// 模拟数据进行测试
const node1 = new ListNode(1)
node1.next = new ListNode(2)
node1.next.next = new ListNode(3)

const newHead = reverseLinkedList(node1)

let current = newHead
while (current) {
  console.log(current.val)
  current = current.next
}