import { AnimateConfig } from "./animateConfig";

type EventObject = {
    type: string;
    time: number;
}

export type AnimateEventProps = {
    target: string;
    targetProps: Record<string, any>;
    animateConfig?: AnimateConfig;
};

export type AnimateEvent = EventObject & AnimateEventProps & {
    type: 'animate';
};

export type WaitEventProps = {
    duration: number;
};

export type WaitEvent = EventObject & WaitEventProps & {
    type: 'wait';
};

export type GroupEventProps = {
    events: TimelineEvent[];
};

export type SequenceEvent = EventObject & GroupEventProps & {
    type: 'sequence';
};

export type ParallelEvent = EventObject & GroupEventProps & {
    type: 'parallel';
};

export type TimelineEvent =
    | AnimateEvent
    | WaitEvent
    | SequenceEvent
    | ParallelEvent;
