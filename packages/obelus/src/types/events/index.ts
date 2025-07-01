import { AnimateConfig } from "./AnimateConfig";

export type AnimateEvent = {
    type: 'animate';
    time: number;
    target: string;
    targetProps: Record<string, any>;
    animateConfig?: AnimateConfig;
};

export type WaitEvent = {
    type: 'wait';
    time: number;
    duration: number;
};

export type TimelineEvent =
    | AnimateEvent
    | WaitEvent;
