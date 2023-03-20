import ListNode from './面试题_listNode'

function reverseLinkedList(head: ListNode | null): ListNode | null {
    if(head === null || head.next === null) return head

    const newHead = reverseLinkedList(head.next)

    head.next.next = head
    head.next = null 

    return newHead
}

// 模拟数据进行测试
const node1 = new ListNode(1)
node1.next = new ListNode(2)
node1.next.next = new ListNode(3)
node1.next.next.next = new ListNode(50)

const newHead = reverseLinkedList(node1)

let current = newHead
while (current) {
  console.log(current.val)
  current = current.next
}

