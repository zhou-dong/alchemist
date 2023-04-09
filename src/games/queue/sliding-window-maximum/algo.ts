export type Item = {
    value: number;
    index: number;
}

export enum Action {
    POP, PUSH, SHIFT, NONE
}

export enum Target {
    DEQUE, RESULT
}

export type Step = {
    index: number;
    action: Action;
    target: Target;
    deque: Item[];
    result: number[];
    item?: Item;
}

export function maxSlidingWindow(nums: number[], k: number): Step[] {

    const steps: Step[] = [];
    const result: number[] = [];
    const deque: Item[] = [];

    let i = 0;
    for (; i < k; i++) {
        const item: Item = { value: nums[i], index: i };
        while (deque.length > 0 && item.value >= deque[deque.length - 1].value) {
            steps.push({ index: i, action: Action.POP, target: Target.DEQUE, deque: [...deque], result: [...result] });
            deque.pop();
        }

        steps.push({ index: i, action: Action.PUSH, target: Target.DEQUE, deque: [...deque], result: [...result], item });
        deque.push(item);
    }

    steps.push({ index: i - 1, action: Action.PUSH, target: Target.RESULT, deque: [...deque], result: [...result] });
    result.push(deque[0].value);

    for (; i < nums.length; i++) {
        const item: Item = { value: nums[i], index: i };
        while (deque.length > 0 && item.value >= deque[deque.length - 1].value) {

            steps.push({ index: i, action: Action.POP, target: Target.DEQUE, deque: [...deque], result: [...result] });
            deque.pop();
        }

        steps.push({ index: i, action: Action.PUSH, target: Target.DEQUE, deque: [...deque], result: [...result], item });
        deque.push(item);

        while (deque[0].index <= i - k) {
            steps.push({ index: i, action: Action.SHIFT, target: Target.DEQUE, deque: [...deque], result: [...result] });
            deque.shift();
        }

        steps.push({ index: i, action: Action.PUSH, target: Target.RESULT, deque: [...deque], result: [...result] });
        result.push(deque[0].value);
    }

    steps.push({ index: i, action: Action.NONE, target: Target.RESULT, deque: [...deque], result: [...result] });
    return steps;
};
