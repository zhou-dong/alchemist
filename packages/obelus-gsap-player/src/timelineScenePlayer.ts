import gsap from 'gsap';
import { TimelineEvent } from '../../obelus/dist';

function animateNestedProps(
    target: any,
    targetProps: Record<string, any>,
    animateProps: Record<string, any>,
    time: number,
    timeline: gsap.core.Timeline,
): void {

    if (!target) return;
    if (!targetProps) return;

    for (const key in targetProps) {
        const value = targetProps[key];
        if (typeof value !== 'object') {
            // at(0).animate('ball', { opacity: 2 }, { duration: 0.5 })
            // key = opacity
            // value = 2
            timeline.to(target, { [key]: value, ...animateProps }, time);
        } else {
            // Recurse into nested object (e.g., position, rotation, scale)
            // at(0).animate('ball', { position: { y: -50 } }, { duration: 0.5 })
            // key = position
            // value = { y: -50 }
            animateNestedProps(target[key], value, animateProps, time, timeline);
        }
    }
};

type Callback = (...args: any[]) => void | null;

export type TimelineScenePlayerProps = {
    events: TimelineEvent[];
    objectMap: Record<string, any>;
    onStart: Callback;
    onComplete: Callback;
}

export function TimelineScenePlayer({ events, objectMap, onStart, onComplete }: TimelineScenePlayerProps): gsap.core.Timeline {

    const timeline = gsap.timeline({ onStart, onComplete });

    for (const event of events) {
        const target = objectMap[event.target];
        if (!target) {
            console.warn(`Target '${event.target}' not found.`);
            continue;
        }
        animateNestedProps(target, event.targetProps, event.animateProps, event.time, timeline);
    }

    return timeline;
};
