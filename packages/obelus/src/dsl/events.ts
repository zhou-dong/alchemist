import { AnimateEvent, AnimateProps } from "../types/events";

export function at(time: number) {
    return {
        animate: (
            target: string,
            targetProps: Record<string, any>,
            animateProps: AnimateProps
        ): AnimateEvent => ({
            type: 'animate',
            time,
            target,
            targetProps,
            animateProps
        })
    }
}
