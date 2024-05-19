import { ListNode } from "../_commons/listNode";
import { build } from "../_commons/listBuilder";
import { LinkedListNode } from "../../../data-structures/list/linked-list/node.three";

export enum Action {
    define_successor,
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

    function reverseBetween(head: ListNode<number>, left: number, right: number, realHead: LinkedListNode<number>): ListNode<number> | undefined {
        if (left > right || left < 1) {
            return;
        }

        steps.push(new Step(Action.define_successor, [3], realHead, left, right));
        let successor: ListNode<number> | undefined = undefined;
        function reverseN(node: ListNode<number>, n: number, realNode: LinkedListNode<number>): ListNode<number> {
            // boundary check
            if (node.next === undefined || realNode.next === undefined) {
                successor = node.next;
                return node;
            }
            if (n === 1) {
                steps.push(new Step(Action.define_successor, [6], realNode, left, right));
                successor = node.next;
                steps.push(new Step(Action.return_reverse_n_head, [7], realNode, left, right));
                return node;
            }
            steps.push(new Step(Action.assign_reverse_n_last, [7], realNode, left, right));
            const last = reverseN(node.next, n - 1, realNode.next);

            steps.push(new Step(Action.assign_next_next_to_this, [10], realNode, left, right));
            node.next.next = node;

            steps.push(new Step(Action.assign_next_to_successor, [11], realNode, left, right));
            node.next = successor;

            steps.push(new Step(Action.return_reverse_n_last, [12], realNode, left, right));
            return last;
        }

        if (left === 1) {
            steps.push(new Step(Action.start_reverse_n, [16], realHead, left, right));
            return reverseN(head, right, realHead);
        }

        if (head.next) {
            steps.push(new Step(Action.start_reverse_between, [18], realHead, left, right));
            head.next = reverseBetween(head.next, left - 1, right - 1, realHead);
        }

        steps.push(new Step(Action.return_head, [19], realHead, left, right));
        return head;
    };

    const head = build(nums);

    if (head) {
        reverseBetween(head, l, r, listHead);
    }

    return steps;
}
