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

export const alignY = (lineHeight: number, size: number, yAlign: number) => {
    const totalHeight = lineHeight * size;
    const startY = totalHeight / 2 - lineHeight / 2;

    const yAxis: number[] = [];
    for (let i = 0; i < size; i++) {
        const y = startY - i * lineHeight; // vertical centering
        yAxis[i] = y;
    }

    const yInit: number[] = [];
    for (let i = 0; i < size; i++) {
        yInit[i] = yAxis[i] + yAlign;
    }

    return { yAxis, yInit };
};
