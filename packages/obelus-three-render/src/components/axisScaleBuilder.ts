import * as THREE from "three";
import { createInterTextSprite } from "./textSpriteBuilder";

export type AxisScaleLabelOptions = {
    value: number;
    fontSize: number;
    color: string;
    offset: { x: number, y: number, z: number };
    scaleDown: number;
    padding: number;
};

export function buildAxisScale(options: AxisScaleLabelOptions, position: { x: number, y: number, z: number }): THREE.Sprite {
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
