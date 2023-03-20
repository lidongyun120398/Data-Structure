class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
    }
}

function deleteNode(node:ListNode){
    node.val = node.next!.val
    node.next = node.next!.next
}