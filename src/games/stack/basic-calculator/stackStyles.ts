import * as THREE from 'three';

export const text = { color: "green", size: 0.6, height: 0.1 };

export const node = {
    size: { width: 1, height: 1, depth: 1 },
}

export const shell = {
    material: new THREE.MeshBasicMaterial({ color: "lightgrey", opacity: 0.2, transparent: true }),
};

export const stackPosition = {
    name: new THREE.Vector3(-5.2, 7.0, -6),
    stack: new THREE.Vector3(-3, 7.1, -6),
}

export const StackNameStyles = {
    color: "orange",
    size: 0.4,
    height: 0.1
};
