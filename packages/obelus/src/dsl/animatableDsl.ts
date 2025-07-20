import { Animatable } from "../types/animatable";

export function animatable<T>(id: string, target: T): Animatable<T> {
    return { id, target };
};
