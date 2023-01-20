import * as THREE from 'three';

export const text = { color: "green", size: 0.6, height: 0.1 };

export const node = {
    size: { width: 1, height: 1, depth: 1 },
}

export const shell = {
    material: new THREE.MeshBasicMaterial({ color: "lightgrey", opacity: 0.2, transparent: true }),
};

export const stackPosition = {
    name: new THREE.Vector3(-4.5, 6.4, 8),
    stack: new THREE.Vector3(-2.3, 6.5, 8),
}

export const StackNameStyles = {
    color: "orange",
    size: 0.4,
    height: 0.1
};

export const duration = 0.5;
export const minShellSize = 6;
