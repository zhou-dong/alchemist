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
    head: LinkedListNode<number>;

    constructor(action: Action, linesToHighlight: number[], head: LinkedListNode<number>) {
        this.action = action;
        this.linesToHighlight = linesToHighlight;
        this.head = head;
    }
}

export function buildSteps(listHead: LinkedListNode<number>): [Step[], LinkedListNode<number>] {
    const steps: Step[] = [];

    function reverseList(head: LinkedListNode<number>): LinkedListNode<number> {
        if (!head.next) {
            steps.push(new Step(Action.return_head, [2], head));
            return head;
        }

        steps.push(new Step(Action.recurse, [3], head.next));
        const last = reverseList(head.next);

        steps.push(new Step(Action.reverse, [4], head));
        head.next.next = head;

        steps.push(new Step(Action.remove_next, [5], head));
        head.next = undefined;

        steps.push(new Step(Action.return_last, [6], head));
        return last;
    };

    const last: LinkedListNode<number> = reverseList(listHead);
    return [steps, last];
}
