import { AnimatableObject, AnimatableGroup } from "../types/animatable";

export function animatable<T>(id: string, target: T): AnimatableObject<T> {
    return { id, target };
};

export function group(id: string, children: string[]): AnimatableGroup {
    return { id, type: 'group', children };
};
