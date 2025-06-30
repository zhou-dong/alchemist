import type { AnimatableShape } from "../core/types/shapes";

export interface DSLBuilder {
    moveTo(params: { x: number; y: number; z?: number; duration: number }): DSLBuilder;
    fadeIn(params: { duration: number }): DSLBuilder;
    fadeOut(params: { duration: number }): DSLBuilder;
    rotate(params: { angle: number; duration: number }): DSLBuilder;
    scale(params: { factor: number; duration: number }): DSLBuilder;
    waitUntil(params: { time: number }): DSLBuilder;

    sequence(steps: DSLBuilder[]): DSLBuilder;
    parallel(steps: DSLBuilder[]): DSLBuilder;

    build(): AnimatableShape;
}

export interface DSLShapeFactory {
    circle(props: { radius: number }): DSLBuilder;
    rectangle(props: { width: number; height: number }): DSLBuilder;
    text(content: string): DSLBuilder;
    line(props: { x1: number; y1: number; z1?: number; x2: number; y2: number; z2?: number }): DSLBuilder;
    box(props: { width: number; height: number; depth: number }): DSLBuilder;
    sphere(props: { radius: number }): DSLBuilder;
}
