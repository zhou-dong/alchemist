export interface Step {
    row: number;
    col: number;
}

export function buildSteps(isConnected: number[][]): Step[] {
    const steps: Step[] = [];

    for (let row = 0; row < isConnected.length; row++) {
        for (let col = 0; col < isConnected[row].length; col++) {
            if (isConnected[row][col] === 1) {
                steps.push({ row, col });
            }
        }
    }

    return steps;
}
