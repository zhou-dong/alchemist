import { AnimatableObject, AnimatableGroup } from "../types/animatable";

export function animatable<T>(id: string, target: T): AnimatableObject<T> {
    return { id, type: 'object', target };
};

export function group(id: string, children: string[]): AnimatableGroup {
    return { id, type: 'group', children };
};
