import { AnimateStepEvent, WaitStepEvent, StepEvent, SequenceStepsEvent, ParallelStepsEvent } from "../core/stepEvents";

export function animate<T>(target: string, props: T): AnimateStepEvent<T> {
    return { type: 'animate', target, props };
};

export function wait(duration: number): WaitStepEvent {
    return { type: 'wait', duration };
};

export function sequence<T>(steps: StepEvent<T>[]): SequenceStepsEvent<T> {
    return { type: 'sequence', steps };
};

export function parallel<T>(steps: StepEvent<T>[]): ParallelStepsEvent<T> {
    return { type: 'parallel', steps };
};
