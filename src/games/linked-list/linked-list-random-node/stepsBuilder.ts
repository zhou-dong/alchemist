import { LinkedListNode } from "../../../data-structures/list/linked-list/node.three";

export enum Action {
    define_result,
    define_node,
    define_index,
    compuate_random,
    update_result,
    update_node,
    update_index,
    return_result,
}

const getlinesToHighlight = (action: Action): number[] => {
    switch (action) {
        case Action.define_result: return [10];
        case Action.define_node: return [11];
        case Action.define_index: return [12];
        case Action.compuate_random: return [15];
        case Action.update_result: return [17];
        case Action.update_node: return [19]
        case Action.update_index: return [20];
        case Action.return_result: return [23];
    }
}

export class Step {
    action: Action;
    linesToHighlight: number[];
    result: LinkedListNode<number> | undefined;
    current: LinkedListNode<number> | undefined;
    index: number | undefined;
    random: number | undefined;

    constructor(
        action: Action,
        result: LinkedListNode<number> | undefined,
        current: LinkedListNode<number> | undefined,
        index: number | undefined,
        random: number | undefined,
    ) {
        this.action = action;
        this.linesToHighlight = getlinesToHighlight(action);
        this.result = result;
        this.current = current;
        this.index = index;
        this.random = random;
    }
}

export function buildSteps(head: LinkedListNode<number>): Step[] {

    const steps: Step[] = [];

    function getRandom(): LinkedListNode<number | string> | undefined {
        let result: LinkedListNode<number> | undefined = undefined;
        steps.push(new Step(Action.define_result, result, undefined, undefined, undefined));

        let current: LinkedListNode<number> | undefined = head;
        steps.push(new Step(Action.define_node, result, current, undefined, undefined));

        let index = 1;
        steps.push(new Step(Action.define_index, result, current, index, undefined));

        while (current) {
            const random = Math.floor(Math.random() * index)
            steps.push(new Step(Action.compuate_random, result, current, index, random));

            if (random === 0) {
                result = current;
                steps.push(new Step(Action.update_result, result, current, index, random));
            }

            current = current.next;
            steps.push(new Step(Action.update_node, result, current, index, random));

            index++;
            steps.push(new Step(Action.update_index, result, current, index, random));
        }

        steps.push(new Step(Action.return_result, result, current, index, undefined));
        return result;
    }

    getRandom();

    return steps;
}
