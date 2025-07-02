import { StepEvent } from './events';
import { SceneObject } from '../objects/objects';

export type StepScene = {
    objects: SceneObject[];
    steps: StepEvent[];
};
