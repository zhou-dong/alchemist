import { ListNode } from "../_commons/listNode";
import { build } from "../_commons/listBuilder";
import { LinkedListNode } from "../../../data-structures/list/linked-list/node.three";

export enum Action {
    assign_successor,
    return_reverse_n_head,
    recursive_reverse_n,
    assign_last_reverse_n,
    start_reverse_n,
    assign_next_next_to_this,
    assign_next_to_successor,
    return_reverse_n_last,
    recursive_reverse_between,
    reverse_between_assign_next,
    return_head,
    return_last,
}

export class Step {
    action: Action;
    linesToHighlight: number[];
    current: LinkedListNode<number>;
    left?: number;
    right?: number;
    successor?: LinkedListNode<number>;
    n?: number;
    last?: LinkedListNode<number>;

    constructor(
        action: Action,
        linesToHighlight: number[],
        current: LinkedListNode<number>,
        left?: number,
        right?: number,
        successor?: LinkedListNode<number>,
        n?: number,
        last?: LinkedListNode<number>,
    ) {
        this.action = action;
        this.linesToHighlight = linesToHighlight;
        this.current = current;
        this.left = left;
        this.right = right;
        this.successor = successor;
        this.n = n;
        this.last = last;
    }
}

export function buildSteps(listHead: LinkedListNode<number>, nums: number[]): Step[] {
    const l: number = 1;
    const r: number = 2;
    const steps: Step[] = [];

    let successor: ListNode<number> | undefined = undefined;
    let realSuccessor: LinkedListNode<number> | undefined = undefined;
    let realLast: LinkedListNode<number> | undefined = undefined;
    function reverseN(
        node: ListNode<number>,
        n: number,
        realNode: LinkedListNode<number>
    ): ListNode<number> {
        // boundary check
        if (node.next === undefined || realNode.next === undefined) {
            successor = node.next;
            realSuccessor = realNode.next;
            return node;
        }

        if (n === 1) {
            steps.push(new Step(Action.assign_successor, [4], realNode, undefined, undefined, realSuccessor, n, realLast));
            successor = node.next;
            realSuccessor = realNode.next;
            realLast = realNode;
            steps.push(new Step(Action.return_reverse_n_head, [5], realNode, undefined, undefined, realSuccessor, n, realLast));
            return node;
        }

        steps.push(new Step(Action.recursive_reverse_n, [7], realNode, undefined, undefined, realSuccessor, n, realLast));
        const last = reverseN(node.next, n - 1, realNode.next);
        steps.push(new Step(Action.assign_last_reverse_n, [7], realNode, undefined, undefined, realSuccessor, n, realLast));

        steps.push(new Step(Action.assign_next_next_to_this, [8], realNode, undefined, undefined, realSuccessor, n, realLast));
        node.next.next = node;

        steps.push(new Step(Action.assign_next_to_successor, [9], realNode, undefined, undefined, realSuccessor, n, realLast));
        node.next = successor;

        steps.push(new Step(Action.return_reverse_n_last, [10], realNode, undefined, undefined, realSuccessor, n, realLast));
        return last;
    }

    function reverseBetween(head: ListNode<number>, left: number, right: number, realHead: LinkedListNode<number>): ListNode<number> | undefined {
        if (left > right || left < 1) {
            return;
        }

        if (left === 1) {
            steps.push(new Step(Action.start_reverse_n, [15], realHead, left, right, realSuccessor, undefined, realLast));
            const returned_last = reverseN(head, right, realHead);

            steps.push(new Step(Action.return_last, [15], realHead, left, right, realSuccessor, undefined, realLast));
            return returned_last;
        }

        if (head.next && realHead.next) {
            steps.push(new Step(Action.recursive_reverse_between, [17], realHead.next, left, right, realSuccessor, undefined, realLast));
            const next = reverseBetween(head.next, left - 1, right - 1, realHead.next);

            steps.push(new Step(Action.reverse_between_assign_next, [17], realHead, left, right, realSuccessor, undefined, realLast));
            head.next = next;
        }

        steps.push(new Step(Action.return_head, [18], realHead, left, right, realSuccessor, undefined, realLast));
        return head;
    };

    const head = build(nums);

    if (head) {
        reverseBetween(head, l, r, listHead);
    }

    return steps;
}
