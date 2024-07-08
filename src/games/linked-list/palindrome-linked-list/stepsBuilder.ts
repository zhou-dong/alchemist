import { LinkedListNode } from "../../../data-structures/list/linked-list/node.three";

export enum Action {
    assign_front_pointer,
    node_null_return_true,
    get_into_recursively_check,
    recursively_check_start,
    recursively_check,
    recursively_check_false,
    recursively_non_eq_front_pointer_val,
    recursively_eq_front_pointer_val,
    update_front_pointer,
    recursively_check_return_true,
    return_final,
}

const getlinesToHighlight = (action: Action): number[] => {
    switch (action) {
        case Action.recursively_check_start: return [3];
        case Action.assign_front_pointer: return [18];
        case Action.get_into_recursively_check: return [19];
        case Action.node_null_return_true: return [5];
        case Action.recursively_check: return [7];
        case Action.recursively_check_false: return [8]
        case Action.recursively_non_eq_front_pointer_val: return [11];
        case Action.update_front_pointer: return [13];
        case Action.recursively_check_return_true: return [14];
        case Action.return_final: return [19];
        case Action.recursively_eq_front_pointer_val: return [12];
    }
}

export class Step {
    action: Action;
    linesToHighlight: number[];
    head: LinkedListNode<number | string>;
    frontPointer: LinkedListNode<number | string> | undefined;
    current: LinkedListNode<number | string> | undefined;

    constructor(
        action: Action,
        head: LinkedListNode<number | string>,
        frontPointer: LinkedListNode<number | string> | undefined,
        current: LinkedListNode<number | string> | undefined
    ) {
        this.action = action;
        this.linesToHighlight = getlinesToHighlight(action);
        this.head = head;
        this.frontPointer = frontPointer;
        this.current = current;
    }
}

export function buildSteps(head: LinkedListNode<number | string>): Step[] {

    const steps: Step[] = [];

    let frontPointer: LinkedListNode<number | string> | undefined;

    function recursivelyCheck(node: LinkedListNode<number | string> | undefined): boolean {
        steps.push(new Step(Action.recursively_check_start, head, frontPointer, node));
        if (node === undefined) {
            steps.push(new Step(Action.node_null_return_true, head, frontPointer, node));
            return true;
        }

        steps.push(new Step(Action.recursively_check, head, frontPointer, node));
        if (!recursivelyCheck(node.next)) {
            steps.push(new Step(Action.recursively_check_false, head, frontPointer, node));
            return false;
        }

        if (node.data !== frontPointer?.data) {
            steps.push(new Step(Action.recursively_non_eq_front_pointer_val, head, frontPointer, node));
            return false;
        }

        steps.push(new Step(Action.recursively_eq_front_pointer_val, head, frontPointer, node));

        frontPointer = frontPointer.next;
        steps.push(new Step(Action.update_front_pointer, head, frontPointer, node));
        return true;
    }

    function isPalindrome(head: LinkedListNode<number | string>): boolean {
        frontPointer = head;
        steps.push(new Step(Action.assign_front_pointer, head, frontPointer, undefined));

        steps.push(new Step(Action.get_into_recursively_check, head, frontPointer, undefined));

        const result = recursivelyCheck(head);
        steps.push(new Step(Action.return_final, head, frontPointer, undefined));
        return result;
    };

    isPalindrome(head);

    return steps;
}
