import { ListNode } from "../_commons/listNode";
import { build } from "../_commons/listBuilder";
import { LinkedListNode } from "../../../data-structures/list/linked-list/node.three";

export enum Action {
    assign_successor,
    return_reverse_n_head,
    assign_reverse_n_last,
    start_reverse_n,
    assign_next_next_to_this,
    assign_next_to_successor,
    return_reverse_n_last,
    start_reverse_between,
    return_head,
}

export class Step {
    action: Action;
    linesToHighlight: number[];
    current: LinkedListNode<number>;
    left: number;
    right: number;

    constructor(action: Action, linesToHighlight: number[], current: LinkedListNode<number>, left: number, right: number) {
        this.action = action;
        this.linesToHighlight = linesToHighlight;
        this.current = current;
        this.left = left;
        this.right = right;
    }
}

export function buildSteps(listHead: LinkedListNode<number>, nums: number[], l: number, r: number): Step[] {
    const steps: Step[] = [];

    let successor: ListNode<number> | undefined = undefined;
    function reverseN(node: ListNode<number>, n: number, realNode: LinkedListNode<number>, left: number, right: number): ListNode<number> {
        // boundary check
        if (node.next === undefined || realNode.next === undefined) {
            successor = node.next;
            return node;
        }

        if (n === 1) {
            steps.push(new Step(Action.assign_successor, [4], realNode, left, right));
            successor = node.next;
            steps.push(new Step(Action.return_reverse_n_head, [5], realNode, left, right));
            return node;
        }
        steps.push(new Step(Action.assign_reverse_n_last, [7], realNode, left, right));
        const last = reverseN(node.next, n - 1, realNode.next, left, right);

        steps.push(new Step(Action.assign_next_next_to_this, [8], realNode, left, right));
        node.next.next = node;

        steps.push(new Step(Action.assign_next_to_successor, [9], realNode, left, right));
        node.next = successor;

        steps.push(new Step(Action.return_reverse_n_last, [10], realNode, left, right));
        return last;
    }

    function reverseBetween(head: ListNode<number>, left: number, right: number, realHead: LinkedListNode<number>): ListNode<number> | undefined {
        if (left > right || left < 1) {
            return;
        }

        if (left === 1) {
            steps.push(new Step(Action.start_reverse_n, [15], realHead, left, right));
            return reverseN(head, right, realHead, left, right);
        }

        if (head.next) {
            steps.push(new Step(Action.start_reverse_between, [17], realHead, left, right));
            head.next = reverseBetween(head.next, left - 1, right - 1, realHead);
        }

        steps.push(new Step(Action.return_head, [18], realHead, left, right));
        return head;
    };

    const head = build(nums);

    if (head) {
        reverseBetween(head, l, r, listHead);
    }

    return steps;
}
