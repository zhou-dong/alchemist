import * as THREE from "three";

// Create an x-axis with line and dots
export function buildXAxis(
    options: {
        start: { x: number, y: number, z: number };
        end: { x: number, y: number, z: number };
        dotCount: number;
        lineWidth: number;
        lineMaterial: THREE.Material;
        dotRadius: number;
        dotMaterial: THREE.Material;
    }
): THREE.Group {
    const {
        start,
        end,
        dotCount,
        lineWidth,
        lineMaterial,
        dotRadius,
        dotMaterial
    } = options;
    const group = new THREE.Group();

    // Create the main line (always horizontal)
    const lineLength = end.x - start.x;

    const lineGeometry = new THREE.CylinderGeometry(lineWidth / 2, lineWidth / 2, Math.abs(lineLength), 8);
    const lineMesh = new THREE.Mesh(lineGeometry, lineMaterial);

    // Position line at midpoint (always horizontal)
    lineMesh.position.set(
        start.x + lineLength * 0.5,
        start.y,
        start.z
    );

    // Always rotate 90° around Z for horizontal orientation
    lineMesh.quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);

    group.add(lineMesh);

    // Create dots along the line (always horizontal)
    const spacing = lineLength / (dotCount - 1);

    for (let i = 0; i < dotCount; i++) {
        const dotX = start.x + spacing * i;
        const dotGeometry = new THREE.SphereGeometry(dotRadius, 8, 8);
        const dotMesh = new THREE.Mesh(dotGeometry, dotMaterial);
        dotMesh.position.set(dotX, start.y, start.z);
        group.add(dotMesh);
    }

    return group;
};
