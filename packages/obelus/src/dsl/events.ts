import { AnimateEvent, WaitEvent } from "../types/events";

export function at(time: number) {
    return {
        animate: (
            target: string,
            targetProps: Record<string, any>,
            animateProps?: Record<string, any>
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
