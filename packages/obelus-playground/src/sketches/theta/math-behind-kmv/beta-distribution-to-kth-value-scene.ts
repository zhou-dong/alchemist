import { animate, latex, type StepScene } from "../../../../../obelus/dist";
import { alignY } from "../interfaces/utils";
import { betaDistributionToExpectedKthValueFormulas } from "./beta-distribution-to-kth-value-latex";

const color = "blue";
const fontSize = "28px";

const lineHeight = 80;
const yAlign = -1000;

const { yAxis, yInit } = alignY(lineHeight, betaDistributionToExpectedKthValueFormulas.length, yAlign);
const keyPrefix = "betaDistributionToExpectedKthValueStep_";

const objects = betaDistributionToExpectedKthValueFormulas.map(({ formula, height }, index) =>
    latex(keyPrefix + index, {
        expression: formula,
        position: { x: 0, y: yInit[index], z: 0 },
        extra: {
            style: { color, fontSize },
            height,
        }
    })
);

const steps = betaDistributionToExpectedKthValueFormulas.map(({ }, index) =>
    animate(
        keyPrefix + index,
        { position: { y: yAxis[index] } },
        { duration: 1 }
    )
);

export const stepScene: StepScene = { objects, steps };
