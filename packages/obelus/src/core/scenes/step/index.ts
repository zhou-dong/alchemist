import { StepEvent } from '../../events/step';
import { SceneObject } from '../../objects';

export type StepScene = {
    objects: SceneObject[];
    steps: StepEvent[];
};
