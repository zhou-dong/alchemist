import { ListNode } from "./listNode";

export const build = <T>(values: T[]): ListNode<T> | undefined => {
    const dummy = new ListNode<T>(-1 as any);
    let current = dummy;
    values.forEach(value => {
        current.next = new ListNode(value);
        current = current.next;
    });
    return dummy.next;
}
