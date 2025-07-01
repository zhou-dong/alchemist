import { TimelineEvent } from "../types/events";
import { SceneObject } from "../types/objects";

export type Scene = {
    objects: SceneObject[];
    timeline: TimelineEvent[];
};
