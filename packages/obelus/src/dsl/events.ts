import { AnimateEvent, AnimateEventProps, GroupEventProps, ParallelEvent, SequenceEvent, WaitEvent, WaitEventProps } from "../types/events";

function animate(time: number, props: AnimateEventProps): AnimateEvent {
    return { ...props, type: 'animate', time };
}

function wait(time: number, props: WaitEventProps): WaitEvent {
    return { ...props, type: 'wait', time };
}

function sequence(time: number, props: GroupEventProps): SequenceEvent {
    return { ...props, type: 'sequence', time };
}

function parallel(time: number, props: GroupEventProps): ParallelEvent {
    return { ...props, type: 'parallel', time };
}

export function at(time: number) {
    return {
        animate: (props: AnimateEventProps): AnimateEvent => animate(time, props),
        wait: (props: WaitEventProps): WaitEvent => wait(time, props),
        sequence: (props: GroupEventProps): SequenceEvent => sequence(time, props),
        parallel: (props: GroupEventProps): ParallelEvent => parallel(time, props)
    }
}
