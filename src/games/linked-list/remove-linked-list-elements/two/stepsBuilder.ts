import { ListNode } from "../../_commons/listNode";
import { build } from "../../_commons/listBuilder";

export enum Action {
    create_dummy_head,
    dummy_head_next_to_head,
    define_current,
    current_to_current_next,
    current_next_to_current_next_next,
    return_dummy_head_next,
}

const getlinesToHighlight = (action: Action): number[] => {
    switch (action) {
        case Action.create_dummy_head: return [2];
        case Action.dummy_head_next_to_head: return [3];
        case Action.define_current: return [5];
        case Action.current_next_to_current_next_next: return [8];
        case Action.current_to_current_next: return [10];
        case Action.return_dummy_head_next: return [14];
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

    function removeElements(head: ListNode<number>, val: number): ListNode<number> | undefined {
        const dummyHead = new ListNode<number>(0);
        steps.push(new Step(Action.create_dummy_head))

        dummyHead.next = head;
        steps.push(new Step(Action.dummy_head_next_to_head));

        let current = dummyHead;
        steps.push(new Step(Action.define_current));
        while (current.next) {
            if (current.next.val === val) {
                current.next = current.next.next;
                steps.push(new Step(Action.current_next_to_current_next_next));
            } else {
                current = current.next;
                steps.push(new Step(Action.current_to_current_next));
            }
        }

        steps.push(new Step(Action.return_dummy_head_next));
        return dummyHead.next;
    };

    const head = build(nums);
    if (head) {
        removeElements(head, val);
    }

    return steps;
}
