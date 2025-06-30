import type { AnimationCommand } from '../types/animations';
import type { AnimatableShape } from '../types/shapes';

/**
 * A runtime representation of a shape that can be manipulated on screen.
 */
export interface RenderableObject {
    id: string;
    setOpacity(opacity: number): void;
    setPosition(x: number, y: number, z: number): void;
    setRotation(angle: number): void;
    setScale(factor: number): void;
}

/**
 * Defines a runtime engine responsible for executing animation commands.
 */
export interface AnimationEngine {
    animate(object: RenderableObject, commands: AnimationCommand[]): void;
}

/**
 * Defines a renderer responsible for creating and managing 3D scene objects.
 */
export interface SceneRenderer {
    init(canvas: HTMLCanvasElement): void;
    addObject(shape: AnimatableShape): RenderableObject;
    renderFrame(time: number): void;
}
