import Container from "../commons/container";
import Step, { swap } from "../commons/step";

export const sort = (arrays: Container[]): Step[] => {
    const steps: Step[] = [];

    for (let i = arrays.length - 1; i >= 0; i--) {
        for (let y = 0; y < i; y++) {
            const a = arrays[y];
            const b = arrays[y + 1];
            let finished = undefined;
            let exchange = (a.payload > b.payload) ? true : false;
            if (exchange) {
                swap(arrays, y, y + 1);
            }
            if (y + 1 === i) {
                finished = exchange ? a : b;
            }
            const step: Step = { a, b, exchange, finished };
            steps.push(step);
        }
    }

    return steps;
}
