import { AnimateEvent } from "./animateEvent";

export type StepEvent<T> =
    | AnimateStepEvent<T>
    | WaitStepEvent
    | SequenceStepsEvent<T>
    | ParallelStepsEvent<T>;

export type AnimateStepEvent<T> = AnimateEvent<T> & {
    type: 'animate';
};

export type WaitStepEvent = {
    type: 'wait';
    duration: number;
};

export type SequenceStepsEvent<T> = {
    type: 'sequence';
    steps: StepEvent<T>[];
};

export type ParallelStepsEvent<T> = {
    type: 'parallel';
    steps: StepEvent<T>[];
};
