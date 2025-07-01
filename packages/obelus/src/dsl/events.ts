import { AnimateEvent, WaitEvent } from "../types/events";
import { AnimateProps } from "../types/events/animateProps";

export function at(time: number) {
    return {
        animate: (
            target: string,
            targetProps: Record<string, any>,
            animateProps?: AnimateProps
        ): AnimateEvent => ({
            type: 'animate',
            time,
            target,
            targetProps,
            animateProps
        }),
        wait: (
            duration: number
        ): WaitEvent => ({
            type: 'wait',
            time,
            duration
        })
    }
}
