import { TimelineEvent } from "./events";
import { SceneObject } from "../objects/objects";

export type TimelineScene = {
    objects: SceneObject[];
    timeline: TimelineEvent[];
};
