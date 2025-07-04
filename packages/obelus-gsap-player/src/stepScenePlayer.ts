import { StepEvent } from "../../obelus/dist";

type Callback = (...args: any[]) => void | null;

export type TimelineScenePlayerProps = {
    events: StepEvent[];
    objectMap: Record<string, any>;
    onStart: Callback;
    onComplete: Callback;
}
