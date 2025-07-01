import gsap from 'gsap';
import { Object3D } from 'three';
import { TimelineEvent } from '../types/events';

export function playScene(timelineEvents: TimelineEvent[], context: Record<string, Object3D>): void {
    for (const { target, targetProps, animateProps, time } of timelineEvents) {
        const targetObject = context[target];
        if (!targetObject) {
            console.warn(`Target '${target}' not found in objectMap.`);
            continue;
        }
        gsap.to(targetObject, {
            ...targetProps,
            ...animateProps,
            delay: time
        });
    }
}
