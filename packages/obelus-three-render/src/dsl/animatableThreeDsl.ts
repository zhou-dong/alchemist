import { type AnimatableObject } from "obelus";
import * as THREE from "three";
import { buildCylinderLine } from "../builders/cylinderLineBuilder";
import { buildAxis, AxisOptions } from "../builders/axisBuilder";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import { buildCss3dLatex } from "../builders/css3dLatexBuilder";

export function animatable(id: string, target: THREE.Object3D): AnimatableObject<THREE.Object3D> {
    return { id, target, type: 'object' };
};

export function circle(id: string, geometry: THREE.CircleGeometry, material: THREE.Material): AnimatableObject<THREE.Mesh> {
    return { id, target: new THREE.Mesh(geometry, material), type: 'object' };
};

export function line(id: string, start: THREE.Vector3, end: THREE.Vector3, width: number, material: THREE.Material): AnimatableObject<THREE.Mesh> {
    const mesh = buildCylinderLine(start, end, width, material);
    return { id, target: mesh, type: 'object' };
};

export function latex(id: string, text: string, position: THREE.Vector3, style: Partial<CSSStyleDeclaration> = {}): AnimatableObject<CSS3DObject> {
    const element = buildCss3dLatex(text, style);
    element.position.set(position.x, position.y, position.z);
    return { id, target: element, type: 'object' };
};

export function text(id: string, text: string, position: THREE.Vector3, style: Partial<CSSStyleDeclaration> = {}): AnimatableObject<CSS3DObject> {
    const element = document.createElement('div');
    element.textContent = text;
    Object.assign(element.style, style);
    const css3dObject = new CSS3DObject(element);
    css3dObject.position.set(position.x, position.y, position.z);
    return { id, target: css3dObject, type: 'object' };
};

export function axis(id: string, options: AxisOptions): AnimatableObject<THREE.Group> {
    const group = buildAxis(options);
    return { id, target: group, type: 'object' };
};

export function scaleAxisChildren(id: string): string[] {
    return [id, id + '_min', id + '_max'];
}

export function scaleAxis(
    id: string,
    axisOptions: AxisOptions,
    min: number,
    max: number,
    textStyle: Partial<CSSStyleDeclaration>,
    textOffset: THREE.Vector3
): AnimatableObject<THREE.Group | CSS3DObject>[] {
    const { start, end } = axisOptions.position;
    const minPosition = new THREE.Vector3(start.x + textOffset.x, start.y + textOffset.y, start.z + textOffset.z);
    const maxPosition = new THREE.Vector3(end.x + textOffset.x, end.y + textOffset.y, end.z + textOffset.z);

    const baseLine = axis(id, axisOptions);
    const minText = text(id + '_min', min.toString(), minPosition, textStyle);
    const maxText = text(id + '_max', max.toString(), maxPosition, textStyle);
    return [baseLine, minText, maxText];
};
