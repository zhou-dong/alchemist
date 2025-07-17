import { Animatable } from './animatable';
import { StepEvent } from './stepEvents';

export type StepScene<T, S> = {
    objects: Animatable<T>[];
    steps: StepEvent<S>[];
};
