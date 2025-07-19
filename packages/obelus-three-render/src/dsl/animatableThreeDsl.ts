import { type AnimatableObject } from "obelus";
import * as THREE from "three";
import { createLatexSprite } from "../builders/latexBuilder";
import { buildCylinderLine } from "../builders/cylinderLineBuilder";
import { buildAxis, AxisOptions } from "../builders/axisBuilder";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";

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

export function scaleAxis(
    id: string,
    axisOptions: AxisOptions,
    min: number,
    max: number,
    textStyle: Partial<CSSStyleDeclaration>,
    textOffset: { x: number, y: number, z: number }
): AnimatableObject<THREE.Group | CSS3DObject>[] {
    const { position } = axisOptions;

    const minText = css3dText(id + '_min', min.toString(), textStyle);
    const maxText = css3dText(id + '_max', max.toString(), textStyle);

    minText.target.position.copy(new THREE.Vector3(position.start.x, position.start.y, position.start.z).add(new THREE.Vector3(textOffset.x, textOffset.y, textOffset.z)));
    maxText.target.position.copy(new THREE.Vector3(position.end.x, position.end.y, position.end.z).add(new THREE.Vector3(textOffset.x, textOffset.y, textOffset.z)));

    return [
        axis(id, axisOptions),
        minText,
        maxText
    ];
};

export function css3dText(id: string, text: string, style: Partial<CSSStyleDeclaration>): AnimatableObject<CSS3DObject> {
    const element = document.createElement('div');
    element.textContent = text;
    Object.assign(element.style, style);
    return { id, target: new CSS3DObject(element), type: 'object' };
};
