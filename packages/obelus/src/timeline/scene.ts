import { TimelineEvent } from "../timeline/events";
import { SceneObject } from "../shared/objects/objects";

export type Scene = {
    objects: SceneObject[];
    timeline: TimelineEvent[];
};
