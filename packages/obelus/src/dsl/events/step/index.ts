import { AnimateProps } from "../../../core/events/shared/animateEvent";
import { AnimateStepEvent, WaitStepEvent, StepEvent, SequenceStepsEvent, ParallelStepsEvent } from "../../../core/events/step";

export const animate = (
    target: string,
    targetProps: Record<string, any>,
    animateProps: AnimateProps
): AnimateStepEvent => ({
    type: 'animate',
    target,
    targetProps,
    animateProps
});

export const wait = (duration: number): WaitStepEvent => ({
    type: 'wait',
    duration
});

export const sequence = (steps: StepEvent[]): SequenceStepsEvent => ({
    type: 'sequence',
    steps
});

export const parallel = (steps: StepEvent[]): ParallelStepsEvent => ({
    type: 'parallel',
    steps
});
