import { TimelineEvent } from "./events";
import { SceneObject } from "../objects/objects";

export type Scene = {
    objects: SceneObject[];
    timeline: TimelineEvent[];
};
