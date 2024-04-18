import { ListNode } from "../_commons/listNode";
import { build } from "../_commons/listBuilder";
import { LinkedListNode } from "../../../data-structures/list/linked-list/node.three";

export enum Action {
    return_head,
    recurse,
    reverse,
    remove_next,
    return_last
}

export class Step {
    action: Action;
    linesToHighlight: number[];
    current: LinkedListNode<number>;

    constructor(action: Action, linesToHighlight: number[], current: LinkedListNode<number>) {
        this.action = action;
        this.linesToHighlight = linesToHighlight;
        this.current = current;
    }
}

export function buildSteps(listHead: LinkedListNode<number>, nums: number[]): Step[] {
    const steps: Step[] = [];

    function reverseList(head: ListNode<number>, realHead: LinkedListNode<number>): ListNode<number> {
        if (!head.next) {
            steps.push(new Step(Action.return_head, [2], realHead));
            return head;
        }

        steps.push(new Step(Action.recurse, [3], realHead));
        const last = reverseList(head.next, realHead.next!);

        steps.push(new Step(Action.reverse, [4], realHead));
        head.next.next = head;

        steps.push(new Step(Action.remove_next, [5], realHead));
        head.next = undefined;

        steps.push(new Step(Action.return_last, [6], realHead));
        return last;
    };

    const head = build(nums);
    if (head) {
        reverseList(head, listHead);
    }
    return steps;
}
