import * as THREE from "three";
import { AxisOptions } from "../builders/axisBuilder";

export const hotpinkAxis = (start: Partial<{ x: number, y: number, z: number }>, end: Partial<{ x: number, y: number, z: number }>): AxisOptions => {
    const defaultStart = { x: 0, y: 0, z: 0 };
    const defaultEnd = { x: 1, y: 1, z: 1 };
    return {
        position: { start: { ...defaultStart, ...start }, end: { ...defaultEnd, ...end } },
        dotCount: 3,
        lineWidth: 2,
        lineMaterial: new THREE.LineBasicMaterial({ color: 'hotpink' }),
        dotMaterial: new THREE.MeshBasicMaterial({ color: 'cyan' }),
        dotRadius: 4
    }
};

export const defaultScaleProps = (offset: Partial<{ x: number, y: number, z: number }>) => {
    const defaultOffset = { x: 0, y: 0, z: 0 };
    return {
        min: '0',
        max: '1',
        scaleStyle: {
            fontSize: '16px',
            color: 'cyan',
            fontWeight: 'normal',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        },
        scaleOffset: { ...defaultOffset, ...offset }
    }
};
