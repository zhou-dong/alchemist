import { AnimateEvent } from "../events";

export type StepEvent =
    | AnimateStepEvent
    | WaitStepEvent
    | SequenceStepsEvent
    | ParallelStepsEvent;

export type AnimateStepEvent = AnimateEvent & {
    type: 'animate';
};

export type WaitStepEvent = {
    type: 'wait';
    duration: number;
};

export type SequenceStepsEvent = {
    type: 'sequence';
    steps: StepEvent[];
};

export type ParallelStepsEvent = {
    type: 'parallel';
    steps: StepEvent[];
};
