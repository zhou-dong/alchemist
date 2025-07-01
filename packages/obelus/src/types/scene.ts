import { TimelineEvent } from "./events";
import { AnimateConfig } from "./events/AnimateConfig";
import { SceneObject } from "./objects";

export type Scene = {
    objects: SceneObject[];
    timeline: TimelineEvent[];
    timelineOptions?: {
        playMode?: 'auto' | 'manual';
        animateConfig?: AnimateConfig;
    };
};
