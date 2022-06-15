import Container from "../_commons/container";
import { swap } from "../_commons/helps";
import Step from "./step";

export const sort = (arrays: Container[]): Step[] => {
    const steps: Step[] = [];

    for (let i = 0; i < arrays.length - 1; i++) {

        let min = i;

        for (let j = i + 1; j < arrays.length; j++) {
            if (arrays[j].payload < arrays[min].payload) {
                min = j;
            }
            steps.push({ min, a: arrays[i], b: arrays[j], exchange: false });
        }

        if (min !== i) {
            steps.push({ min, a: arrays[i], b: arrays[min], exchange: true });
            swap(arrays, i, min);
        } else {
            steps.push({ min, a: arrays[i], b: arrays[min], exchange: true });
        }

    }

    return steps;
}
