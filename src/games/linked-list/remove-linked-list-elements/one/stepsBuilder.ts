import { ListNode } from "../../_commons/listNode";
import { build } from "../../_commons/listBuilder";

export enum Action {
    return_null,
    found_next,
    head_next_to_next,
    return_head_next,
    return_head,
}

const getlinesToHighlight = (action: Action): number[] => {
    switch (action) {
        case Action.return_null: return [3];
        case Action.found_next: return [5];
        case Action.head_next_to_next: return [5];
        case Action.return_head_next: return [6];
        case Action.return_head: return [6];
    }
}

export class Step {
    action: Action;
    linesToHighlight: number[];

    constructor(action: Action) {
        this.action = action;
        this.linesToHighlight = getlinesToHighlight(action);
    }
}

export const buildSteps = (nums: number[], val: number): Step[] => {
    const steps: Step[] = [];

    function removeElements(head: ListNode<number> | undefined, val: number): ListNode<number> | undefined {
        if (head === undefined) {
            steps.push(new Step(Action.return_null));
            return head;
        }

        const next = removeElements(head.next, val);
        steps.push(new Step(Action.found_next));

        head.next = next;
        steps.push(new Step(Action.head_next_to_next));

        if (head.val === val) {
            steps.push(new Step(Action.return_head_next));
            return head.next;
        } else {
            steps.push(new Step(Action.return_head));
            return head;
        }
    };

    const head = build(nums);
    if (head) {
        removeElements(head, val);
    }

    return steps;
}
