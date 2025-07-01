import { AnimateEvent, AnimateEventProps, GroupEventProps, ParallelEvent, SequenceEvent, WaitEvent, WaitEventProps } from "../types/events";

export function animate(props: AnimateEventProps): AnimateEvent {
    return { ...props, type: 'animate' };
}

export function wait(props: WaitEventProps): WaitEvent {
    return { ...props, type: 'wait' };
}

export function sequence(props: GroupEventProps): SequenceEvent {
    return { ...props, type: 'sequence' };
}

export function parallel(props: GroupEventProps): ParallelEvent {
    return { ...props, type: 'parallel' };
}
