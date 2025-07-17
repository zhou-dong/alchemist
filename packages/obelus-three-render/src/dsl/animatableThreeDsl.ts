import { type AnimatableObject } from "obelus";
import { Object3D } from "three";

export function animatable(id: string, target: Object3D): AnimatableObject<Object3D> {
    return { id, target };
};
