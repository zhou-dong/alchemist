import { AnimateEvent, AnimateProps } from "../events";

export type StepEvent =
    | AnimateStepEvent
    | WaitStepEvent
    | SequenceEvent
    | ParallelEvent;

export type AnimateStepEvent = AnimateEvent & {
    type: 'animate';
};

export type WaitStepEvent = {
    type: 'wait';
    duration: number;
};

export type SequenceEvent = {
    type: 'sequence';
    steps: StepEvent[];
};

export type ParallelEvent = {
    type: 'parallel';
    steps: StepEvent[];
};
