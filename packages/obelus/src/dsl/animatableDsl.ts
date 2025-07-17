import { Animatable } from "../types/animatable";

export function animatable<T>(id: string, object: T): Animatable<T> {
    return { id, object };
};
