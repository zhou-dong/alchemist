import { type Animatable } from "obelus";
import * as THREE from "three";
import { Line } from "../shapes/line";
import { Axis } from "../shapes/axis";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import { Latex } from "../shapes/latex";

interface Position {
    x: number;
    y: number;
    z: number;
}

const defaultPosition: Position = { x: 0, y: 0, z: 0 };

function getPosition(position: Partial<Position>): Position {
    return {
        x: position.x ?? defaultPosition.x,
        y: position.y ?? defaultPosition.y,
        z: position.z ?? defaultPosition.z
    };
}

export function circle(id: string, geometry: THREE.CircleGeometry, material: THREE.Material): Animatable<THREE.Mesh> {
    return { id, target: new THREE.Mesh(geometry, material) };
};

export function line(
    id: string,
    start: Partial<Position>,
    end: Partial<Position>,
    width: number,
    material: THREE.Material
): Animatable<THREE.Mesh> {
    const mesh = Line(getPosition(start), getPosition(end), width, material);
    return { id, target: mesh };
};

export function latex(
    id: string,
    text: string,
    position: Partial<Position> = defaultPosition,
    style: Partial<CSSStyleDeclaration> = {}
): Animatable<CSS3DObject> {
    const element = Latex(text, style);
    const { x, y, z } = getPosition(position);
    element.position.set(x, y, z);
    return { id, target: element };
};

export function text(
    id: string,
    text: string,
    position: Partial<Position> = defaultPosition,
    style: Partial<CSSStyleDeclaration> = {}
): Animatable<CSS3DObject> {
    const element = document.createElement('div');
    element.textContent = text;
    Object.assign(element.style, style);
    const css3dObject = new CSS3DObject(element);
    const { x, y, z } = getPosition(position);
    css3dObject.position.set(x, y, z);
    return { id, target: css3dObject };
};

export type AxisProps = {
    start: Partial<Position>;
    end: Partial<Position>;
    dotCount?: number;
    lineWidth?: number;
    lineMaterial: THREE.Material;
    dotRadius?: number;
    dotMaterial: THREE.Material;
};

export function axis(id: string, props: AxisProps): Animatable<THREE.Group> {
    const start = getPosition(props.start);
    const end = getPosition(props.end);
    const { dotCount = 3, lineWidth = 1, lineMaterial, dotRadius = 4, dotMaterial } = props;
    const target = Axis(start, end, dotCount, lineWidth, lineMaterial, dotRadius, dotMaterial);
    return { id, target };
};
