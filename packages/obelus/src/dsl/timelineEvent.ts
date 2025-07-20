import { TimelineEvent } from "../types/timelineEvent";

export function at(time: number) {
    return {
        animate: (
            targetId: string,
            targetProps: Record<string, any>,
            animateProps: Record<string, any>,
        ): TimelineEvent => ({
            time,
            targetId,
            targetProps,
            animateProps
        })
    }
};
