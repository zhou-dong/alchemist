import type { AnimationCommand } from "./animations";

export type ShapeKind =
    | 'circle'
    | 'rectangle'
    | 'text'
    | 'line'
    | 'box'
    | 'sphere';

export interface AnimatableShape {
    kind: ShapeKind;
    props: Record<string, any>;
    animations: AnimationCommand[];
}
