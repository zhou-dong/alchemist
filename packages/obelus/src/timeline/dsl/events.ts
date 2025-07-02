import { AnimateProps } from "../../events";
import { TimelineEvent } from "../events";

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
