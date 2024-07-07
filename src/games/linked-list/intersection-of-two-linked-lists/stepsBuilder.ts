import { LinkedListNode } from "../../../data-structures/list/linked-list/node.three";

export enum Action {
    define_pa_pb,
    update_pa_pb,
    return_pa,
}

const getlinesToHighlight = (action: Action): number[] => {
    switch (action) {
        case Action.define_pa_pb: return [5];
        case Action.update_pa_pb: return [7, 8];
        case Action.return_pa: return [10];
    }
}

export class Step {
    action: Action;
    linesToHighlight: number[];
    headA: LinkedListNode<number | string>;
    headB: LinkedListNode<number | string>;
    pA?: LinkedListNode<number | string>;
    pB?: LinkedListNode<number | string>;

    constructor(
        action: Action,
        headA: LinkedListNode<number | string>,
        headB: LinkedListNode<number | string>,
        pA?: LinkedListNode<number | string>,
        pB?: LinkedListNode<number | string>
    ) {
        this.action = action;
        this.headA = headA;
        this.headB = headB;
        this.linesToHighlight = getlinesToHighlight(action);
        this.pA = pA;
        this.pB = pB;
    }
}

export function buildSteps(headA: LinkedListNode<number | string>, headB: LinkedListNode<number | string>): Step[] {
    const steps: Step[] = [];

    function getIntersectionNode(): LinkedListNode<number | string> | undefined {
        let pA: LinkedListNode<number | string> | undefined = headA, pB: LinkedListNode<number | string> | undefined = headB;
        steps.push(new Step(Action.define_pa_pb, headA, headB, pA, pB));

        while (pA !== pB) {
            pA = pA === undefined ? headB : pA.next;
            pB = pB === undefined ? headA : pB.next;
            steps.push(new Step(Action.update_pa_pb, headA, headB, pA, pB));
        }

        steps.push(new Step(Action.return_pa, headA, headB, pA, pB));
        return pA;
    };

    getIntersectionNode();
    return steps;
}
