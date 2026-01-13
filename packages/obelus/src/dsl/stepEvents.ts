import { WaitStepEvent, StepEvent, SequenceStepsEvent, ParallelStepsEvent, AnimateStepEvent, CallStepEvent } from "../types/stepEvents";
import { AnimateCallbacks } from "../types/animateCallbacks";

export function animate(
    targetId: string,
    targetProps: Record<string, any>,
    animateProps: Record<string, any>,
    callbacks?: AnimateCallbacks,
): AnimateStepEvent {
    return { type: 'animate', targetId, targetProps, animateProps, callbacks };
};

export function wait(duration: number): WaitStepEvent {
    return { type: 'wait', duration };
};

export function call(fn: () => void): CallStepEvent {
    return { type: 'call', fn };
};

export function sequence(steps: StepEvent[]): SequenceStepsEvent {
    return { type: 'sequence', steps };
};

export function parallel(steps: StepEvent[]): ParallelStepsEvent {
    return { type: 'parallel', steps };
};
