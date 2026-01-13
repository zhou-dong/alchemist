import { AnimateEvent } from "./animateEvent";
import { CallEvent } from "./callEvent";

export type StepEvent =
    | AnimateStepEvent
    | CallStepEvent
    | WaitStepEvent
    | SequenceStepsEvent
    | ParallelStepsEvent;

export type AnimateStepEvent = AnimateEvent;

export type CallStepEvent = CallEvent;

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
