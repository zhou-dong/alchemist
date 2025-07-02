import { AnimateProps, TimelineEvent } from "../timeline/events";

export function at(time: number) {
    return {
        animate: (
            target: string,
            targetProps: Record<string, any>,
            animateProps: AnimateProps
        ): TimelineEvent => ({
            time,
            target,
            targetProps,
            animateProps
        })
    }
}
