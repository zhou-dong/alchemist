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
    num: number;
    head?: LinkedListNode<number>;
    newNext?: LinkedListNode<number>;

    constructor(action: Action, num: number, head?: LinkedListNode<number>, newNext?: LinkedListNode<number>) {
        this.action = action;
        this.linesToHighlight = getlinesToHighlight(action);
        this.num = num;
        this.head = head;
        this.newNext = newNext;
    }
}

export const buildSteps = (listHead: LinkedListNode<number>, nums: number[], val: number): Step[] => {
    const steps: Step[] = [];

    function removeElements(realHead: LinkedListNode<number> | undefined, head: ListNode<number> | undefined, val: number): [ListNode<number> | undefined, LinkedListNode<number> | undefined] {

        steps.push(new Step(Action.recursive, val, realHead));

        if (head === undefined) {
            steps.push(new Step(Action.return_null, val, undefined));
            return [head, realHead];
        }

        const [next, realNext] = removeElements(realHead?.next, head.next, val);
        steps.push(new Step(Action.found_next, val, realHead, realNext));

        head.next = next;
        steps.push(new Step(Action.head_next_to_next, val, realHead, realNext));

        if (head.val === val) {
            steps.push(new Step(Action.return_head_next, val, realHead, realNext));
            return [head.next, realHead?.next];
        } else {
            steps.push(new Step(Action.return_head, val, realHead, realHead));
            return [head, realHead];
        }
    };

    const head = build(nums);
    if (head) {
        removeElements(listHead, head, val);
    }

    return steps;
}
