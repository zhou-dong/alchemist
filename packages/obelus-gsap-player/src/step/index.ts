import { StepEvent } from "../../../obelus/dist";

type Callback = (...args: any[]) => void | null;

export type StepScenePlayerProps = {
    events: StepEvent[];
    objectMap: Record<string, any>;
    onStart: Callback;
    onComplete: Callback;
}

export function StepScenePlayer({ }) {

}
