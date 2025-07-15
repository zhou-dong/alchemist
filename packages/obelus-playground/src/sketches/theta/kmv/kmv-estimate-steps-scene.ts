import * as THREE from 'three';
import { animate, latex, type StepScene } from "../../../../../obelus/dist";
import { kmvEstimationFormulas } from "./kmv-estimate-steps-latex";

const color = "blue";
const fontSize = "28px";

const lineHeight = 80;

const yAxis: number[] = [];
const yAlign = -1000;

// Compute total height
const count = kmvEstimationFormulas.length;
const totalHeight = lineHeight * count;
const startY = totalHeight / 2 - lineHeight / 2;

const objects = kmvEstimationFormulas.map(({ formula, height }, index) => {

    let y = startY - index * lineHeight; // vertical centering
    y = y + yAlign;
    yAxis[index] = y;

    return latex("betaDistributionToExpectedKthValueStep_" + index, {
        expression: formula,
        position: { x: 0, y, z: 0 },
        extra: {
            style: { color, fontSize },
            height: height,
        }
    });
});

const steps = kmvEstimationFormulas.map(({ }, index) => {
    const y = yAxis[index] - yAlign
    return animate("betaDistributionToExpectedKthValueStep_" + index, { position: { y } }, { duration: 1 })
});

export const stepScene: StepScene = { objects, steps };

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
