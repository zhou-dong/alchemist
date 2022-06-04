import Container from "./container"

export const swap = (arrays: Container[], a: number, b: number): void => {
    const temp = arrays[a];
    arrays[a] = arrays[b];
    arrays[b] = temp;
}
