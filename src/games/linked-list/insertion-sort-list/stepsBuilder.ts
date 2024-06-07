import { ListNode } from "../_commons/listNode";
import { build } from "../_commons/listBuilder";
import { LinkedListNode } from "../../../data-structures/list/linked-list/node.three";

export enum Action {
    create_dummy_head,
    dummy_head_next_to_head,
    define_current,
    current_to_current_next,
    define_temp,
    current_next_to_current_next_next,
    define_prev,
    prev_to_prev_next,
    temp_next_to_prev_next,
    prev_next_to_temp,
    return_dummy_head_next,
}

const getlinesToHighlight = (action: Action): number[] => {
    switch (action) {
        case Action.create_dummy_head: return [2];
        case Action.dummy_head_next_to_head: return [3];
        case Action.define_current: return [5];
        case Action.current_to_current_next: return [8];
        case Action.define_temp: return [10];
        case Action.current_next_to_current_next_next: return [11];
        case Action.define_prev: return [13];
        case Action.prev_to_prev_next: return [15];
        case Action.temp_next_to_prev_next: return [18];
        case Action.prev_next_to_temp: return [19];
        case Action.return_dummy_head_next: return [23];
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

export function buildSteps(listHead: LinkedListNode<number | string>, nums: number[], realDummyHead: LinkedListNode<number | string>): Step[] {

    const steps: Step[] = [];

    function insertionSortList(head: ListNode<number>, realHead: LinkedListNode<number | string>): ListNode<number> | undefined {
        const dummyHead = new ListNode<number>(0);
        steps.push(new Step(Action.create_dummy_head))

        dummyHead.next = head;
        steps.push(new Step(Action.dummy_head_next_to_head));

        let curr = head;
        let current = realHead;
        steps.push(new Step(Action.define_current));

        while (curr && curr.next) {
            if (curr.val <= curr.next.val) {
                current = current.next!;
                steps.push(new Step(Action.current_to_current_next));
                curr = curr.next;
            } else {

                let temp = curr.next;
                steps.push(new Step(Action.define_temp));
                curr.next = curr.next.next;
                steps.push(new Step(Action.current_next_to_current_next_next));

                let prev = dummyHead;
                let realPrev = realDummyHead;
                steps.push(new Step(Action.define_prev));
                while (prev.next && (prev.next.val <= temp.val)) {
                    prev = prev.next;
                    realPrev = realPrev.next!;
                    steps.push(new Step(Action.prev_to_prev_next));
                }

                temp.next = prev.next;
                steps.push(new Step(Action.temp_next_to_prev_next));
                prev.next = temp;
                steps.push(new Step(Action.prev_next_to_temp));
            }
        }

        steps.push(new Step(Action.return_dummy_head_next));
        return dummyHead.next;
    };


    const head = build(nums);
    if (head) {
        insertionSortList(head, listHead);
    }

    return steps;
}
