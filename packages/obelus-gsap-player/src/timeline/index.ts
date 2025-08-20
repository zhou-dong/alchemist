import gsap from 'gsap';
import { type TimelineEvent } from 'obelus';

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

export function buildAnimateTimeline(
    events: TimelineEvent[],
    objectMap: Record<string, any>,
    onStart: Callback,
    onComplete: Callback,
): gsap.core.Timeline {

    const timeline = gsap.timeline({
        paused: true,  // Prevents auto-start
        onStart,
        onComplete
    });

    for (const event of events) {
        const target = objectMap[event.targetId];
        if (!target) {
            console.warn(`Target '${event.targetId}' not found.`);
            continue;
        }
        animateNestedProps(target, event.targetProps, event.animateProps, event.time, timeline);
    }

    return timeline;
};
