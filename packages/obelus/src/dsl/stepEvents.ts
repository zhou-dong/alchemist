import { AnimateStepEvent, WaitStepEvent, StepEvent, SequenceStepsEvent, ParallelStepsEvent } from "../types/stepEvents";

export function animate(targetId: string, targetProps: Record<string, any>, animateProps: Record<string, any>): AnimateStepEvent {
    return { type: 'animate', targetId, targetProps, animateProps };
};

export function wait(duration: number): WaitStepEvent {
    return { type: 'wait', duration };
};

export function sequence(steps: StepEvent[]): SequenceStepsEvent {
    return { type: 'sequence', steps };
};

export function parallel(steps: StepEvent[]): ParallelStepsEvent {
    return { type: 'parallel', steps };
};
