import Container from "./container"

type Step = {
    a: Container;
    b: Container;
    exchange: boolean;
    finished?: Container;
}

export default Step;

export const swap = (arrays: Container[], a: number, b: number): void => {
    const temp = arrays[a];
    arrays[a] = arrays[b];
    arrays[b] = temp;
}
