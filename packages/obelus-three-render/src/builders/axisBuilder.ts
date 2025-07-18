import * as THREE from "three";
import { buildCylinderLine } from "./cylinderLineBuilder";

export type AxisPosition = {
    start: { x: number, y: number, z: number };
    end: { x: number, y: number, z: number };
};

export type AxisOptions = {
    position: AxisPosition;
    dotCount: number;
    lineWidth: number;
    lineMaterial: THREE.Material;
    dotRadius: number;
    dotMaterial: THREE.Material;
};

// Generic axis creation function
export function buildAxis(options: AxisOptions): THREE.Group {
    const {
        position,
        dotCount,
        lineWidth,
        lineMaterial,
        dotMaterial,
        dotRadius
    } = options;

    const group = new THREE.Group();
    const { start, end } = position;

    const startPoint = new THREE.Vector3(start.x, start.y, start.z);
    const endPoint = new THREE.Vector3(end.x, end.y, end.z);
    const line = buildCylinderLine(start, end, lineWidth, lineMaterial);
    group.add(line);

    // Create dots along the axis
    for (let i = 0; i < dotCount; i++) {
        const t = i / (dotCount - 1); // Parameter from 0 to 1
        const dotPosition = new THREE.Vector3().lerpVectors(startPoint, endPoint, t);

        const dotGeometry = new THREE.SphereGeometry(dotRadius);
        const dotMesh = new THREE.Mesh(dotGeometry, dotMaterial);
        dotMesh.position.copy(dotPosition);

        group.add(dotMesh);
    }

    return group;
}

