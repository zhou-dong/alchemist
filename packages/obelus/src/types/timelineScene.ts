import { AnimatableObject } from "./animatable";
import { TimelineEvent } from "./timelineEvent";

export type TimelineScene<T> = {
    objects: AnimatableObject<T>[];
    timeline: TimelineEvent[];
};
