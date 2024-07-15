import { LinkedListNode } from "../../../data-structures/list/linked-list/node.three";

export enum Action {
    standby,
    update_node_val,
    update_node_next,
}

const getlinesToHighlight = (action: Action): number[] => {
    switch (action) {
        case Action.standby: return [1];
        case Action.update_node_val: return [3];
        case Action.update_node_next: return [4];
    }
}

export class Step {
    action: Action;
    linesToHighlight: number[];
    node: LinkedListNode<number> | undefined;
    next: LinkedListNode<number> | undefined;

    constructor(
        action: Action,
        node: LinkedListNode<number> | undefined,
        next: LinkedListNode<number> | undefined,
    ) {
        this.action = action;
        this.linesToHighlight = getlinesToHighlight(action);
        this.node = node;
        this.next = next;
    }
}

export function buildSteps(node: LinkedListNode<number> | undefined): Step[] {
    const steps: Step[] = [];
    steps.push(new Step(Action.standby, node, node?.next));
    steps.push(new Step(Action.update_node_val, node, node?.next));
    steps.push(new Step(Action.update_node_next, node, node?.next));
    return steps;
}
