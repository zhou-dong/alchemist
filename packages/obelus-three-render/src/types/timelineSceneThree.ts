import { type TimelineEvent } from "obelus";
import { type Animatable } from "obelus";
import { Object3D } from "three";

export type TimelineSceneThree = {
    objects: Animatable<Object3D>[];
    timeline: TimelineEvent[];
};
