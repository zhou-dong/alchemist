import { Point } from "../_commons/point";

export const nonCorrect = (currentPoint: Point, leftMax: number[], rightMax: number[], water: number[], value: number): boolean => {
    const { row, col } = currentPoint;
    if (row === 0) {
        return leftMax[col] !== value;
    } else if (row === 1) {
        return rightMax[col] !== value;
    } else {
        return water[col] !== value;
    }
};

export const isLastCell = (currentPoint: Point, water: number[]): boolean => {
    const { row, col } = currentPoint;
    return row === 2 && col === water.length - 1;
};

export const getNextPoint = ({ row, col }: Point, cols: number): Point => {
    if (row === 0) {
        if (col >= cols - 1) {
            return { row: 1, col: cols - 1 };
        } else {
            return { row: 0, col: col + 1 };
        }
    } else if (row === 1) {
        if (col === 0) {
            return { row: 2, col: 0 };
        } else {
            return { row: 1, col: col - 1 };
        }
    } else {
        return { row, col: col + 1 };
    }
};
