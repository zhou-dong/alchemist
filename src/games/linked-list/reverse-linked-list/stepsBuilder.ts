// Definition for singly-linked list.
class ListNode {
    val: number
    next?: ListNode

    constructor(val: number, next?: ListNode) {
        this.val = val;
        this.next = next;
    }
}

function reverseList(head: ListNode): ListNode {
    if (!head.next) return head;
    const last = reverseList(head.next);
    head.next.next = head;
    head.next = undefined;
    return last;
};

export function buildSteps(nums: number[]) {

}
