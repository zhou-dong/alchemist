import { AnimateProps } from "../../../core/events/shared/animateEvent";
import { TimelineEvent } from "../../../core/events/timeline";

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
};
