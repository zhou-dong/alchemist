import { animate, latex, type StepScene } from "../../../../../obelus/dist";
import { alignY } from "../interfaces/utils";
import { kmvEstimationFormulas } from "./kmv-estimate-steps-latex";

const color = "blue";
const fontSize = "28px";

const lineHeight = 80;
const yAlign = -150;

const { yAxis, yInit } = alignY(lineHeight, kmvEstimationFormulas.length, yAlign);
const keyPrefix = "kmvEstimate_";

const objects = kmvEstimationFormulas.map(({ formula, height }, index) =>
    latex(keyPrefix + index, {
        expression: formula,
        position: { x: 0, y: yInit[index], z: 0 },
        extra: {
            style: { color, fontSize },
            height,
        }
    })
);

const steps = kmvEstimationFormulas.map(({ }, index) =>
    animate(
        keyPrefix + index,
        { position: { y: yAxis[index] } },
        { duration: 1 }
    )
);

export const stepScene: StepScene = { objects, steps };
