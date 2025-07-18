import { type AnimatableObject } from "obelus";
import * as THREE from "three";
import { createLatexSprite } from "../components/latexBuilder";
import { buildCylinderLine } from "../components/cylinderLineBuilder";
import { buildAxis, AxisOptions } from "../components/axisBuilder";
import { buildAxisScale, AxisScaleLabelOptions } from "../components/axisScaleBuilder";

export function animatable(id: string, target: THREE.Object3D): AnimatableObject<THREE.Object3D> {
    return { id, target, type: 'object' };
};

export function circle(id: string, geometry: THREE.CircleGeometry, material: THREE.Material): AnimatableObject<THREE.Mesh> {
    return { id, target: new THREE.Mesh(geometry, material), type: 'object' };
};

export function line(id: string, points: THREE.Vector3[], material: THREE.Material): AnimatableObject<THREE.Line> {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return { id, target: new THREE.Line(geometry, material), type: 'object' };
};

export function cylinderLine(id: string, start: THREE.Vector3, end: THREE.Vector3, width: number, material: THREE.Material): AnimatableObject<THREE.Mesh> {
    const mesh = buildCylinderLine(start, end, width, material);
    return { id, target: mesh, type: 'object' };
};

export async function latex(id: string, text: string, height: number, style?: Partial<CSSStyleDeclaration>): Promise<AnimatableObject<THREE.Sprite>> {
    const sprite = await createLatexSprite(text, style, height);
    return { id, target: sprite, type: 'object' };
};

export function axis(id: string, options: AxisOptions): AnimatableObject<THREE.Group> {
    const group = buildAxis(options);
    return { id, target: group, type: 'object' };
};

export type ScaleAxisOptions = AxisOptions & {
    scale: {
        min: AxisScaleLabelOptions;
        max: AxisScaleLabelOptions;
    };
};

export function scaleAxis(id: string, options: ScaleAxisOptions): AnimatableObject<THREE.Group> {
    const group = buildAxis(options);
    const { scale, position } = options;
    group.add(buildAxisScale(scale.min, position.start));
    group.add(buildAxisScale(scale.max, position.end));
    return { id, target: group, type: 'object' };
};
