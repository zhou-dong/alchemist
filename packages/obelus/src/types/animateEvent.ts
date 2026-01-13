import { AnimateCallbacks } from "./animateCallbacks";

export type AnimateEvent = {
    type: 'animate';
    targetId: string;
    targetProps: Record<string, any>;
    animateProps: Record<string, any>;
    callbacks?: AnimateCallbacks;
};
