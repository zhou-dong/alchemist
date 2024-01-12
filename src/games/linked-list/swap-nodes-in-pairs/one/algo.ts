import { LinkedListNode } from "../../../../data-structures/list/linked-list/node.three";

export enum Order {
    PreOrder, PostOrder
}

export enum Action {
    Return_Head,
    Define_Temp,
    Swap
}

export interface Step {
    action: Action;
    order: Order;
    head?: LinkedListNode<number>;
    next?: LinkedListNode<number>;
    linesToHighlight: number[]
}

export function buildSteps(head: LinkedListNode<number>): Step[] {
    const steps: Step[] = [];

    function swapPairs(head: LinkedListNode<number> | undefined): LinkedListNode<number> | undefined {

        if (head === undefined || head.next === undefined) {
            // pre-order
            steps.push({ head, next: head?.next, order: Order.PreOrder, linesToHighlight: [1, 5], action: Action.Define_Temp });

            // post-order
            steps.push({ head, next: head?.next, order: Order.PostOrder, linesToHighlight: [3], action: Action.Return_Head, });
            return head;
        }

        const temp = head.next;
        steps.push({ head, next: head.next, order: Order.PreOrder, linesToHighlight: [1, 5], action: Action.Define_Temp });

        head.next = swapPairs(temp.next);
        temp.next = head;
        steps.push({ head, next: temp, linesToHighlight: [6, 7], action: Action.Swap, order: Order.PostOrder, });

        return temp;
    };

    swapPairs(head);

    return steps;
}
