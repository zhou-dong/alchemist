import { AnimateProps } from "./animateProps";

type EventObject = {
    type: string;
    time: number;
}

export type AnimateEvent = EventObject & {
    type: 'animate';
    target: string;
    targetProps: Record<string, any>;
    animateProps?: AnimateProps;
};

export type WaitEvent = EventObject & {
    type: 'wait';
    duration: number;
};

export type TimelineEvent =
    | AnimateEvent
    | WaitEvent;
