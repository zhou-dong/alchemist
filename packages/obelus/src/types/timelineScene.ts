import { Animatable } from "./animatable";
import { TimelineEvent } from "./timelineEvent";

export type TimelineScene<T> = {
    objects: Animatable<T>[];
    timeline: TimelineEvent[];
};
