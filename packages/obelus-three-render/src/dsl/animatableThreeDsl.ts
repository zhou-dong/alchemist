import { type AnimatableObject } from "obelus";
import * as THREE from "three";
import { createLatexSprite } from "../components/latexBuilder";
import { buildCylinderLine } from "../components/cylinderLineBuilder";
import { buildXAxis } from "../components/xAxisBuilder";

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

export function xAxis(
    id: string,
    options: {
        start: { x: number, y: number, z: number };
        end: { x: number, y: number, z: number };
        dotCount: number;
        lineWidth?: number;
        lineMaterial?: THREE.Material;
        dotRadius?: number;
        dotMaterial?: THREE.Material;
    }
): AnimatableObject<THREE.Group> {
    const { start, end, dotCount } = options;

    const lineWidth: number = options.lineWidth ?? 3;
    const lineMaterial: THREE.Material = options.lineMaterial || new THREE.MeshBasicMaterial({ color: "hotpink" });
    const dotRadius: number = options.dotRadius ?? 4;
    const dotMaterial: THREE.Material = options.dotMaterial || new THREE.MeshBasicMaterial({ color: "#333" });

    const group = buildXAxis({ start, end, dotCount, lineWidth, lineMaterial, dotRadius, dotMaterial });

    return { id, target: group, type: 'object' };
} 
