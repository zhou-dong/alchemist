import { TimelineEvent } from "../../events/timeline";
import { SceneObject } from "../../objects";

export type TimelineScene = {
    objects: SceneObject[];
    timeline: TimelineEvent[];
};
