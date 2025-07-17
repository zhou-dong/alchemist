import { AnimatableObject, AnimatableGroup } from './animatable';
import { StepEvent } from './stepEvents';

export type StepScene<T> = {
    objects: (AnimatableObject<T> | AnimatableGroup)[];
    steps: StepEvent[];
};
