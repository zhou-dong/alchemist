import { AnimateConfig } from "./animateConfig";

type EventProps = {
    time: number;
}

type EventObject = {
    type: string;
}

export type AnimateEventProps = EventProps & {
    target: string;
    targetProps: Record<string, any>;
    animateConfig?: AnimateConfig;
}

export type AnimateEvent = EventObject & AnimateEventProps & {
    type: 'animate';
};

export type WaitEventProps = EventProps & {
    duration: number;
}

export type WaitEvent = EventObject & WaitEventProps & {
    type: 'wait';
};

export type GroupEventProps = EventProps & {
    events: TimelineEvent[];
}

export type SequenceEvent = EventObject & GroupEventProps & {
    type: 'sequence';

};

export type ParallelEvent = EventObject & GroupEventProps & {
    type: 'parallel';
};

export type TimelineEvent = AnimateEvent | WaitEvent | SequenceEvent | ParallelEvent;
