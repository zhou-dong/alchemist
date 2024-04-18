// Definition for singly-linked list.
export class ListNode<T> {
    val: T
    next?: ListNode<T>

    constructor(val: T, next?: ListNode<T>) {
        this.val = val;
        this.next = next;
    }
}
