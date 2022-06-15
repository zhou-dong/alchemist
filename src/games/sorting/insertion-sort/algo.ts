import Container from "../_commons/container";
import { Action, Step } from "./step";

export const sort = (arrays: Container[]): Step[] => {
    const steps: Step[] = [];

    for (let i = 1; i < arrays.length; i++) {

        const temp = arrays[i];
        steps.push({ a: temp, action: Action.Leave });

        let j = i - 1;
        while (j >= 0 && arrays[j].payload > temp.payload) {
            steps.push({ a: arrays[j], action: Action.Override, index: j + 1 });
            arrays[j + 1] = arrays[j];
            j--;
        }

        steps.push({ a: temp, action: Action.Insert, index: j + 1 });
        arrays[j + 1] = temp;

    }

    return steps;
}
