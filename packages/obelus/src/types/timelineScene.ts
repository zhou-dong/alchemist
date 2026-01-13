import { Animatable } from "./animatable";
import { TimelineEvent } from "./timelineEvents";

export type TimelineScene<T> = {
    objects: Animatable<T>[];
    timeline: TimelineEvent[];
};
