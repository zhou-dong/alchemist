import { Animatable, AnimatableGroup } from "../types/animatable";

export function animatable<T>(id: string, target: T): Animatable<T> {
    return { id, target };
};

export function group(id: string, children: string[]): AnimatableGroup {
    return { id, type: 'group', children };
};
