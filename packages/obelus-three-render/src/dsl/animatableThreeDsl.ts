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

export function latex(id: string, text: string, position: { x: number, y: number, z: number }, style: Partial<CSSStyleDeclaration> = {}): AnimatableObject<CSS3DObject> {
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

interface ScaleProps {
    min: string;
    max: string;
    scaleStyle: Partial<CSSStyleDeclaration>;
    scaleOffset: THREE.Vector3;
}

export function scaleAxis(id: string, axisOptions: AxisOptions, scaleProps: ScaleProps): AnimatableObject<THREE.Group | CSS3DObject>[] {
    const { min, max, scaleStyle, scaleOffset } = scaleProps;
    const baseLine = axis(id, axisOptions);
    const minText = text(id + '_min', min, createPosition(axisOptions.position.start, scaleOffset), scaleStyle);
    const maxText = text(id + '_max', max, createPosition(axisOptions.position.end, scaleOffset), scaleStyle);
    return [baseLine, minText, maxText];
};

function createPosition(position: THREE.Vector3, textOffset: THREE.Vector3): THREE.Vector3 {
    return new THREE.Vector3(position.x + textOffset.x, position.y + textOffset.y, position.z + textOffset.z);
};
