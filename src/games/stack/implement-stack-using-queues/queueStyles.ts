import * as THREE from 'three';

export const text = { color: "green", size: 0.6, height: 0.1 };

export const node = {
    size: { width: 1, height: 1, depth: 1 },
}

export const queue = {
    material: new THREE.MeshBasicMaterial({ color: "lightgrey", opacity: 0.5, transparent: true }),
};

export const queueOnePosition = {
    name: new THREE.Vector3(-3.6, 3.8, -4),
    queue: new THREE.Vector3(-3, 3, -4),
}
export const queueTwoPosition = {
    name: new THREE.Vector3(-3.6, 0.7, -4),
    queue: new THREE.Vector3(-3, 0, -4)
}

export const queueNameStyles = {
    color: "orange",
    size: 0.4,
    height: 0.1
};
