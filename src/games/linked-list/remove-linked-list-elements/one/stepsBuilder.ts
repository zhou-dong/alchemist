import { ListNode } from "../../_commons/listNode";
import { build } from "../../_commons/listBuilder";
import { LinkedListNode } from "../../../../data-structures/list/linked-list/node.three";

export enum Action {
    return_null,
    recursive,
    found_next,
    head_next_to_next,
    return_head_next,
    return_head,
}

export enum Order {
    PreOrder, PostOrder
}

const getlinesToHighlight = (action: Action): number[] => {
    switch (action) {
        case Action.return_null: return [3];
        case Action.recursive: return [5];
        case Action.found_next: return [5];
        case Action.head_next_to_next: return [5];
        case Action.return_head_next: return [6];
        case Action.return_head: return [6];
    }
}

export class Step {
    action: Action;
    linesToHighlight: number[];
    order: Order;
    num: number;
    head?: LinkedListNode<number>;

    constructor(action: Action, order: Order, num: number, head?: LinkedListNode<number>) {
        this.action = action;
        this.linesToHighlight = getlinesToHighlight(action);
        this.order = order;
        this.num = num;
        this.head = head;
    }
}

export const buildSteps = (listHead: LinkedListNode<number>, nums: number[], val: number): Step[] => {
    const steps: Step[] = [];

    function removeElements(realHead: LinkedListNode<number> | undefined, head: ListNode<number> | undefined, val: number): ListNode<number> | undefined {

        steps.push(new Step(Action.recursive, Order.PreOrder, val, realHead));

        if (head === undefined) {
            steps.push(new Step(Action.return_null, Order.PostOrder, val, undefined));
            return head;
        }

        const next = removeElements(realHead?.next, head.next, val);
        steps.push(new Step(Action.found_next, Order.PostOrder, val, realHead));

        head.next = next;
        steps.push(new Step(Action.head_next_to_next, Order.PostOrder, val, realHead));

        if (head.val === val) {
            steps.push(new Step(Action.return_head_next, Order.PostOrder, val, realHead));
            return head.next;
        } else {
            steps.push(new Step(Action.return_head, Order.PostOrder, val, realHead));
            return head;
        }
    };

    const head = build(nums);
    if (head) {
        removeElements(listHead, head, val);
    }

    return steps;
}
