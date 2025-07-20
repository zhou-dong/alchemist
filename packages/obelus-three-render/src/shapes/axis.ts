import * as THREE from "three";
import { Line } from "./line";
// Generic axis creation function
export function Axis(
    start: { x: number, y: number, z: number },
    end: { x: number, y: number, z: number },
    dotCount: number,
    lineWidth: number,
    lineMaterial: THREE.Material,
    dotRadius: number,
    dotMaterial: THREE.Material
): THREE.Group {
    const group = new THREE.Group();

    const startPoint = new THREE.Vector3(start.x, start.y, start.z);
    const endPoint = new THREE.Vector3(end.x, end.y, end.z);
    const line = Line(start, end, lineWidth, lineMaterial);
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
