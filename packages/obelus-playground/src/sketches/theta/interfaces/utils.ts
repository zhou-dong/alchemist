import * as THREE from 'three';

export const alignX = (objectMap: Record<string, THREE.Object3D>) => {
    const xAlign = Object.keys(objectMap)
        .map(key => objectMap[key])
        .reduce((a, b) => (a.scale.x > b.scale.x) ? a : b)
        .scale
        .x / 2;

    // left-align
    Object.keys(objectMap).forEach(key => {
        const mesh = objectMap[key];
        const width = mesh.scale.x;
        mesh.position.setX(width / 2 - xAlign);
    });
};
