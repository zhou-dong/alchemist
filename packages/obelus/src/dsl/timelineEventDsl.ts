import { TimelineEvent } from "../types/timelineEvent";

type AnimateFn<T> = (target: string, props: T) => TimelineEvent<T>;

export function at<T>(time: number): { animate: AnimateFn<T> } {
    const animate: AnimateFn<T> = (target, props) => ({ time, target, props });
    return { animate };
};
