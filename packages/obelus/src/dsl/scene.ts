import { TimelineEvent } from "../types/events";
import { AnimateConfig } from "../types/events/animateConfig";
import { SceneObject } from "../types/objects";

export type Scene = {
    objects: SceneObject[];
    timeline: TimelineEvent[];
    timelineOptions?: {
        playMode?: 'auto' | 'manual';
        animateConfig?: AnimateConfig;
    };
};
