import { animate, latex, type StepScene } from "../../../../../obelus/dist";
import { alignY } from "../interfaces/utils";
import { orderStatisticsToKmvFormulas } from "./order-statistics-to-kmv-latex";

const color = "#000";
const fontSize = "28px";

const lineHeight = 80;
const yAlign = -1000;

const { yAxis, yInit } = alignY(lineHeight, orderStatisticsToKmvFormulas.length, yAlign);
const keyPrefix = "kmvEstimate_";

const objects = orderStatisticsToKmvFormulas.map(({ formula, height }, index) =>
    latex(keyPrefix + index, {
        expression: formula,
        position: { x: 0, y: yInit[index], z: 0 },
        extra: {
            style: { color, fontSize },
            height,
        }
    })
);

const steps = orderStatisticsToKmvFormulas.map(({ }, index) =>
    animate(
        keyPrefix + index,
        { position: { y: yAxis[index] } },
        { duration: 1 }
    )
);

export const dslStepScene: StepScene = { objects, steps };
