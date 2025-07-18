import gsap from 'gsap';
import { type AnimateStepEvent, type StepEvent, type WaitStepEvent } from "obelus";

type Callback = (...args: any[]) => void | null;

type StepScenePlayerProps = {
    events: StepEvent[];
    objectMap: Record<string, any>;
    onStart: Callback;
    onComplete: Callback;
};

export type PlayableStep = {
    raw: StepEvent[];
    play: () => Promise<void>;
};

export function StepScenePlayer({ events, objectMap, onStart, onComplete }: StepScenePlayerProps): PlayableStep[] {
    const result: PlayableStep[] = [];
    flattenSteps(events, objectMap, result, onStart, onComplete);
    return result;
};

function flattenSteps(
    events: StepEvent[],
    objectMap: Record<string, any>,
    out: PlayableStep[],
    onStart: Callback,
    onComplete: Callback,
): void {
    for (const event of events) {
        switch (event.type) {
            case 'animate':
                out.push({
                    raw: [event],
                    play: () => animateStep(event, objectMap, onStart, onComplete)
                });
                break;
            case 'wait':
                out.push({
                    raw: [event],
                    play: () => waitStep(event)
                });
                break;
            case 'sequence':
                flattenSteps(event.steps, objectMap, out, onStart, onComplete);
                break;
            case 'parallel':
                out.push({
                    raw: event.steps,
                    play: () => Promise.all(event.steps.map(e => runParallerStep(e, objectMap, onStart, onComplete))).then(() => { })
                });
                break;
        }
    }
}

async function runParallerStep(event: StepEvent, objectMap: Record<string, any>, onStart: Callback, onComplete: Callback): Promise<void> {
    switch (event.type) {
        case 'animate': return animateStep(event, objectMap, onStart, onComplete);
        case 'wait': return waitStep(event);
        case 'sequence': return Promise.all(event.steps.map(step => () => runParallerStep(step, objectMap, onStart, onComplete))).then(() => { });
        case 'parallel': return Promise.all(event.steps.map(step => () => runParallerStep(step, objectMap, onStart, onComplete))).then(() => { });
        default: return Promise.resolve();
    }
}

function animateNestedProps(
    target: any,
    targetProps: Record<string, any>,
    animateProps: Record<string, any>,
    events: (() => Promise<void>)[],
    onStart: Callback,
    onComplete: Callback,
): void {

    if (!target) return;
    if (!targetProps) return;

    for (const key in targetProps) {
        const value = targetProps[key];
        if (typeof value !== 'object') {
            // animate('ball', { opacity: 2 }, { duration: 0.5 })
            // key = opacity
            // value = 2
            const event: () => Promise<void> = () => {
                return new Promise((resolve) => {
                    gsap.to(target, {
                        [key]: value,
                        ...animateProps,
                        onStart,
                        onComplete: () => {
                            onComplete();
                            resolve();
                        }
                    });
                });
            };

            events.push(event);
        } else {
            // Recurse into nested object (e.g., position, rotation, scale)
            // animate('ball', { position: { y: -50 } }, { duration: 0.5 })
            // key = position
            // value = { y: -50 }
            animateNestedProps(
                target[key],
                value,
                animateProps,
                events,
                onStart,
                onComplete
            );
        }
    }
};

async function animateStep(
    event: AnimateStepEvent,
    objectMap: Record<string, any>,
    onStart: Callback,
    onComplete: Callback,
): Promise<void> {
    const target = objectMap[event.targetId];
    if (!target) {
        return Promise.reject(new Error(`Target '${event.targetId}' not found.`));
    }

    const events: (() => Promise<void>)[] = [];
    animateNestedProps(target, event.targetProps, event.animateProps, events, onStart, onComplete);

    return Promise
        .all(events.map(event => event()))
        .then(() => { });
}

function waitStep(event: WaitStepEvent): Promise<void> {
    return new Promise(resolve => {
        gsap.delayedCall(event.duration, resolve);
    });
}
