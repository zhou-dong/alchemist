import { type TimelineEvent } from "obelus";
import { type Animatable } from "obelus";
import { Object3D } from "three";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";

export type TimelineSceneThree = {
    objects: Animatable<Object3D | CSS3DObject>[];
    timeline: TimelineEvent[];
};
