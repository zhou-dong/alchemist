import { AnimationGroupCommand, AnimationGroupCommandKind, AnimationLeafCommand, AnimationLeafCommandKind } from "../core/types/animations";
import { AnimatableShape, ShapeKind } from "../core/types/shapes";

import type { DSLBuilder } from './types';

function createBuilder(kind: ShapeKind, props: Record<string, any>): DSLBuilder {
    const animations: AnimatableShape['animations'] = [];

    const api: DSLBuilder = {
        moveTo(params) {
            return pushLeaf("moveTo", params);
        },
        fadeIn(params) {
            return pushLeaf('fadeIn', params);
        },
        fadeOut(params) {
            return pushLeaf('fadeOut', params);
        },
        rotate(params) {
            return pushLeaf('rotate', params);
        },
        scale(params) {
            return pushLeaf('scale', params);
        },
        waitUntil(params) {
            animations.push({ kind: 'waitUntil', params });
            return api;
        },
        sequence(steps) {
            return pushGroup('sequence', steps);
        },
        parallel(steps) {
            return pushGroup('parallel', steps);
        },
        build() {
            return { kind, props, animations };
        }
    };

    const pushLeaf = (kind: AnimationLeafCommandKind, params: Record<string, any>) => {
        const { duration } = params;
        const command: AnimationLeafCommand = { kind, duration, params };
        animations.push(command);
        return api;
    };

    const pushGroup = (kind: AnimationGroupCommandKind, steps: DSLBuilder[]) => {
        const command: AnimationGroupCommand = { kind, steps: steps.map(s => s.build().animations).flat() };
        animations.push(command);
        return api;
    };

    return api;
}

export function circle(props: { radius: number }): DSLBuilder {
    return createBuilder('line', props);
}

export function rectangle(props: { width: number; height: number }): DSLBuilder {
    return createBuilder('rectangle', props);
}

export function text(content: string): DSLBuilder {
    return createBuilder('text', { value: content });
}

export function line(props: { x1: number; y1: number; z1?: number; x2: number; y2: number; z2?: number }): DSLBuilder {
    return createBuilder('line', props);
}

export function box(props: { width: number; height: number; depth: number }): DSLBuilder {
    return createBuilder('box', props);
}

export function sphere(props: { radius: number }): DSLBuilder {
    return createBuilder('sphere', props);
}
