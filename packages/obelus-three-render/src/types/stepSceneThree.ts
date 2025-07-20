import { type StepEvent } from "obelus";
import { type Animatable } from "obelus";
import { type Object3D } from "three";

export type StepSceneThree = {
    objects: Animatable<Object3D>[];
    steps: StepEvent[];
};
