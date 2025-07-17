import { TimelineEvent } from "../types/timelineEvent";

type AnimateFn = (target: string, targetProps: Record<string, any>, animateProps: Record<string, any>) => TimelineEvent;

export function at(time: number): { animate: AnimateFn } {
    const animate: AnimateFn = (target, targetProps, animateProps) => ({ time, target, targetProps, animateProps });
    return { animate };
};
