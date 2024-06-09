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

const getlinesToHighlight1 = (action: Action): number[] => {
    switch (action) {
        case Action.return_null: return [3];
        case Action.recursive: return [5];
        case Action.found_next: return [5];
        case Action.head_next_to_next: return [5];
        case Action.return_head_next: return [6];
        case Action.return_head: return [6];
    }
}

const getlinesToHighlight2 = (action: Action): number[] => {
    switch (action) {
        case Action.return_null: return [3];
        case Action.recursive: return [5];
        case Action.found_next: return [5];
        case Action.head_next_to_next: return [6];
        case Action.return_head_next: return [8];
        case Action.return_head: return [10];
    }
}

export class Step {
    action: Action;
    linesToHighlight1: number[];
    linesToHighlight2: number[];
    num: number;
    head?: LinkedListNode<number>;
    next?: LinkedListNode<number>;
    newNext?: LinkedListNode<number>;

    constructor(action: Action, num: number, head?: LinkedListNode<number>, next?: LinkedListNode<number>, newNext?: LinkedListNode<number>) {
        this.action = action;
        this.linesToHighlight1 = getlinesToHighlight1(action);
        this.linesToHighlight2 = getlinesToHighlight2(action);
        this.num = num;
        this.head = head;
        this.next = next;
        this.newNext = newNext;
    }
}

export const buildSteps = (listHead: LinkedListNode<number>, nums: number[], val: number): Step[] => {
    const steps: Step[] = [];

    function removeElements(
        head: ListNode<number> | undefined,
        val: number,
        realHead?: LinkedListNode<number>,
    ): [
            ListNode<number> | undefined,
            LinkedListNode<number> | undefined,
        ] {

        steps.push(new Step(Action.recursive, val, realHead));

        if (head === undefined || realHead === undefined) {
            steps.push(new Step(Action.return_null, val));
            return [undefined, undefined];
        }

        const [next, realNext] = removeElements(head.next, val, realHead.next);
        steps.push(new Step(Action.found_next, val, realHead, realNext));

        head.next = next;
        const temp = realHead.next;
        realHead.next = realNext;
        steps.push(new Step(Action.head_next_to_next, val, realHead, temp, realNext));

        if (head.val === val) {
            steps.push(new Step(Action.return_head_next, val, realHead?.next));
            return [head.next, realHead?.next];
        } else {
            steps.push(new Step(Action.return_head, val, realHead));
            return [head, realHead];
        }
    };

    const head = build(nums);
    if (head) {
        removeElements(head, val, listHead);
    }
    return steps;
}
