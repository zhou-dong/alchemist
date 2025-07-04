import { StepScene } from "../dsl/scenes/step";
import { TimelineScene } from "../dsl/scenes/timeline";

function importScene<T>(json: string): T {
    try {
        const parsed = JSON.parse(json);
        return parsed as T;
    } catch (e) {
        throw new Error('Invalid scene JSON: ' + (e as Error).message);
    }
}

function exportScene<T>(scene: T, pretty: boolean): string {
    return JSON.stringify(scene, null, pretty ? 2 : 0);
};

export function importTimelineScene(json: string): TimelineScene {
    return importScene<TimelineScene>(json);
};

export function importStepScene(json: string): StepScene {
    return importScene<StepScene>(json);
};

export function exportTimelineScene(scene: TimelineScene, pretty: boolean): string {
    return exportScene<TimelineScene>(scene, pretty)
};

export function exportStepScene(scene: StepScene, pretty: boolean): string {
    return exportScene<StepScene>(scene, pretty);
};
