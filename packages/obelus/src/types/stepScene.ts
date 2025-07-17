import { Animatable } from './animatable';
import { StepEvent } from './stepEvents';

export type StepScene<T> = {
    objects: Animatable<T>[];
    steps: StepEvent[];
};
