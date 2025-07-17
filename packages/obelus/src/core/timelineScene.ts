import { Animatable } from "./animatable";
import { TimelineEvent } from "./timelineEvent";

export type TimelineScene<T, S> = {
    objects: Animatable<T>[];
    timeline: TimelineEvent<S>[];
};
