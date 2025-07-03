import gsap from 'gsap';
import { TimelineEvent } from '../../obelus';

type SceneContext = {
    objectMap: Record<string, any>;
};

function animateNestedProps(
    target: any,
    targetProps: Record<string, any>,
    animateProps: Record<string, any>,
    timeline: gsap.core.Timeline,
): void {
    for (const key in targetProps) {
        const value = targetProps[key];
        if (typeof value !== 'object') {
            // at(0).animate('ball', { opacity: 2 }, { duration: 0.5 }),
            gsap.to(target, { [key]: value, ...animateProps });
        } else {
            // Recurse into nested object (e.g., position, rotation, scale)
            // at(0).animate('ball', { position: { y: -50 } }, { duration: 0.5 }),
            animateNestedProps(target[key], value, animateProps, timeline);
        }
    }
};

export function playTimelineScene(events: TimelineEvent[], context: SceneContext): gsap.core.Timeline {

    const timeline = gsap.timeline();

    for (const event of events) {
        const target = context.objectMap[event.target];
        if (!target) {
            console.warn(`Target '${event.target}' not found.`);
            continue;
        }
        animateNestedProps(target, event.targetProps, event.animateProps, timeline);
    }

    return timeline;
};
