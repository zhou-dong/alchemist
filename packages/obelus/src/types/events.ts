type BaseEvent = {
    type: string;
    time: number;
}

export type AnimateEvent = BaseEvent & {
    type: 'animate';
    target: string;
    targetProps: Record<string, any>;
    animateProps?: Record<string, any>;
};

export type WaitEvent = BaseEvent & {
    type: 'wait';
    duration: number;
};

export type TimelineEvent =
    | AnimateEvent
    | WaitEvent;
