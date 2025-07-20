import * as THREE from "three";

export function Line(
    start: { x: number, y: number, z: number },
    end: { x: number, y: number, z: number },
    width: number,
    material: THREE.Material
): THREE.Mesh {
    const startVector = new THREE.Vector3(start.x, start.y, start.z);
    const endVector = new THREE.Vector3(end.x, end.y, end.z);

    // Calculate direction and length
    const direction = new THREE.Vector3().subVectors(endVector, startVector);
    const length = direction.length();

    // Create cylinder geometry and mesh
    const geometry = new THREE.CylinderGeometry(width / 2, width / 2, length, 8);
    const mesh = new THREE.Mesh(geometry, material);

    // Position at midpoint
    mesh.position.copy(startVector).add(direction.clone().multiplyScalar(0.5));

    // Normalize direction for rotation
    direction.normalize();

    // Apply rotation based on direction
    if (Math.abs(direction.y) > 0.99) {
        // Vertical - no rotation
        mesh.quaternion.set(0, 0, 0, 1);
    } else if (Math.abs(direction.y) < 0.01 && (Math.abs(direction.x) > 0.99 || Math.abs(direction.z) > 0.99)) {
        // Horizontal - rotate 90° around Z
        mesh.quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);
    } else {
        // Diagonal - quaternion rotation
        const up = new THREE.Vector3(0, 1, 0);
        const axis = new THREE.Vector3().crossVectors(up, direction).normalize();
        const angle = Math.acos(up.dot(direction));
        mesh.quaternion.setFromAxisAngle(axis, angle);
    }

    return mesh;
};
