import { LinkedListNode } from "../../../../data-structures/list/linked-list/node.three";

export enum Order {
    PreOrder, PostOrder
}

export interface Action {
    order?: Order;
    head?: LinkedListNode<number>;
    next?: LinkedListNode<number>;
    linesToHighlight: number[]
}

export function buildActions(head: LinkedListNode<number>): Action[] {
    const actions: Action[] = [];

    function swapPairs(head: LinkedListNode<number> | undefined): LinkedListNode<number> | undefined {

        if (head === undefined || head.next === undefined) {
            actions.push({ head, next: head?.next, linesToHighlight: [3] });
            return head;
        }

        const temp = head.next;
        actions.push({ head, next: temp, order: Order.PreOrder, linesToHighlight: [5] });

        head.next = swapPairs(temp.next);
        actions.push({ head, next: temp, order: Order.PostOrder, linesToHighlight: [6] });

        temp.next = head;
        actions.push({ head, next: temp, linesToHighlight: [7] });

        return temp;
    };

    swapPairs(head);

    return actions;
}
