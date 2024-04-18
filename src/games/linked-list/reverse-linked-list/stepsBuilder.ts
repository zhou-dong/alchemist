import { build } from "../_commons/listBuilder";
import { ListNode } from "../_commons/listNode";

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

    constructor(action: Action, linesToHighlight: number[]) {
        this.action = action;
        this.linesToHighlight = linesToHighlight;
    }
}

export function buildSteps(nums: number[]): Step[] {
    const steps: Step[] = [];

    function reverseList(head: ListNode<number>): ListNode<number> {
        if (!head.next) {
            steps.push(new Step(Action.return_head, [2]));
            return head;
        }

        steps.push(new Step(Action.recurse, [3]));
        const last = reverseList(head.next);

        steps.push(new Step(Action.reverse, [4]));
        head.next.next = head;

        steps.push(new Step(Action.remove_next, [5]));
        head.next = undefined;

        steps.push(new Step(Action.return_last, [6]));
        return last;
    };

    const head = build(nums);
    if (head) {
        reverseList(head);
    }

    return steps;
}
