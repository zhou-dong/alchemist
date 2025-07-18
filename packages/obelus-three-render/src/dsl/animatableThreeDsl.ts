import { type AnimatableObject } from "obelus";
import * as THREE from "three";
import { createLatexSprite } from "../components/latexBuilder";

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

export async function latex(id: string, text: string, height: number, style?: Partial<CSSStyleDeclaration>): Promise<AnimatableObject<THREE.Sprite>> {
    const sprite = await createLatexSprite(text, style, height);
    return { id, target: sprite, type: 'object' };
};
