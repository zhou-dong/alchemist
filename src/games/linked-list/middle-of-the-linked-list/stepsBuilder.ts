import { LinkedListNode } from "../../../data-structures/list/linked-list/node.three";

export enum Action {
    define_slow,
    define_fast,
    update_slow,
    update_fast,
    return_slow,
}

const getlinesToHighlight = (action: Action): number[] => {
    switch (action) {
        case Action.define_slow: return [2];
        case Action.define_fast: return [3];
        case Action.update_slow: return [5];
        case Action.update_fast: return [6];
        case Action.return_slow: return [8];
    }
}

export class Step {
    action: Action;
    linesToHighlight: number[];
    head: LinkedListNode<number>;
    slow: LinkedListNode<number> | undefined;
    fast: LinkedListNode<number> | undefined;

    constructor(
        action: Action,
        head: LinkedListNode<number>,
        slow: LinkedListNode<number> | undefined,
        fast: LinkedListNode<number> | undefined,
    ) {
        this.action = action;
        this.linesToHighlight = getlinesToHighlight(action);
        this.head = head;
        this.slow = slow;
        this.fast = fast;
    }
}

export function buildSteps(head: LinkedListNode<number>): Step[] {

    const steps: Step[] = [];

    function middleNode(head: LinkedListNode<number>): LinkedListNode<number> | undefined {
        let slow: LinkedListNode<number> | undefined = head;
        steps.push(new Step(Action.define_slow, head, slow, undefined));

        let fast: LinkedListNode<number> | undefined = head;
        steps.push(new Step(Action.define_fast, head, slow, fast));

        while (fast !== undefined && fast.next !== undefined) {
            slow = slow?.next;
            steps.push(new Step(Action.update_slow, head, slow, fast));

            fast = fast.next.next;
            steps.push(new Step(Action.update_fast, head, slow, fast));
        }

        steps.push(new Step(Action.return_slow, head, slow, fast));
        return slow;
    };

    middleNode(head);
    return steps;
}
