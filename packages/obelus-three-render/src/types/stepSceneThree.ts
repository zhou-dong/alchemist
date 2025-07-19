import { type StepEvent } from "obelus";
import { type Animatable } from "obelus";
import { type Object3D } from "three";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";

export type StepSceneThree = {
    objects: Animatable<Object3D | CSS3DObject>[];
    steps: StepEvent[];
};
