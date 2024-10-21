
export enum Action {
    create_dummy_head,
    dummy_head_next_to_head,
    define_current,
    current_to_current_next,
    define_temp,
    current_next_to_current_next_next,
    define_prev,
    prev_to_prev_next,
    temp_next_to_prev_next,
    prev_next_to_temp,
    return_dummy_head_next,
}

const getlinesToHighlight = (action: Action): number[] => {
    switch (action) {
        case Action.create_dummy_head: return [2];
        case Action.dummy_head_next_to_head: return [3];
        case Action.define_current: return [5];
        case Action.current_to_current_next: return [8];
        case Action.define_temp: return [10];
        case Action.current_next_to_current_next_next: return [11];
        case Action.define_prev: return [13];
        case Action.prev_to_prev_next: return [15];
        case Action.temp_next_to_prev_next: return [18];
        case Action.prev_next_to_temp: return [19];
        case Action.return_dummy_head_next: return [23];
    }
}

export class Step {
    action: Action;
    linesToHighlight: number[];

    constructor(action: Action) {
        this.action = action;
        this.linesToHighlight = getlinesToHighlight(action);
    }
}

export function buildSteps(nums: number[]): Step[] {

    const steps: Step[] = [];

    return steps;
}
