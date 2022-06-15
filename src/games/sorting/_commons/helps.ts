import Container from "./container"

export const swap = (arrays: Container[], a: number, b: number): void => {
    const temp = arrays[a];
    arrays[a] = arrays[b];
    arrays[b] = temp;
}

export function waitSeconds(seconds: number) {
    return new Promise(resolve => {
        setTimeout(() => resolve(1), seconds * 1000);
    });
}
