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

