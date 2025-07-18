import { type AnimatableObject } from "obelus";
import * as THREE from "three";
import { buildAxis, type AxisOptions } from "./axisBuilder";
import { createInterTextSprite } from "./textSpriteBuilder";

export type ScaleAxisLabelOptions = {
    value: number;
    fontSize: number;
    color: string;
    offset: { x: number, y: number, z: number };
    scaleDown: number;
    padding: number;
};

export type ScaleAxisOptions = AxisOptions & {
    scale: {
        min: ScaleAxisLabelOptions;
        max: ScaleAxisLabelOptions;
    };
};

function buildScale(options: ScaleAxisLabelOptions, position: { x: number, y: number, z: number }): THREE.Sprite {
    const { value, fontSize, color, offset, scaleDown, padding } = options;

    const offsettedPosition = new THREE.Vector3(position.x, position.y, position.z)
        .add(new THREE.Vector3(offset.x, offset.y, offset.z));

    const sprite = createInterTextSprite({
        text: value.toString(),
        fontSize,
        color,
        backgroundColor: 'transparent',
        scaleDown,
        padding
    });

    sprite.position.copy(offsettedPosition);

    return sprite;
}

export function scaleAxis(id: string, options: ScaleAxisOptions): AnimatableObject<THREE.Group> {
    const group = buildAxis(options);
    const { scale, position } = options;

    const min = buildScale(scale.min, position.start);
    const max = buildScale(scale.max, position.end);

    group.add(min);
    group.add(max);

    return { id, target: group, type: 'object' };
}
