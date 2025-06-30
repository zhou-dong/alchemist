import type { AnimationCommand } from "./animations";

export const CIRCLE_SHAPE = 'circle' as const;
export const RECTANGLE_SHAPE = 'rectangle' as const;
export const TEXT_SHAPE = 'text' as const;
export const LINE_SHAPE = 'line' as const;
export const BOX_SHAPE = 'box' as const;
export const SPHERE_SHAPE = 'sphere' as const;

export const shapeKinds = [
    CIRCLE_SHAPE,
    RECTANGLE_SHAPE,
    TEXT_SHAPE,
    LINE_SHAPE,
    BOX_SHAPE,
    SPHERE_SHAPE,
] as const;

export type ShapeKind = typeof shapeKinds[number];

export interface AnimatableShape {
    kind: ShapeKind;
    props: Record<string, any>;
    animations: AnimationCommand[];
}
