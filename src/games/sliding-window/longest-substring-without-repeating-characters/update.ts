import { Point } from '../../commons/point';

export const createNewTableStyles = (table: React.CSSProperties[][]): React.CSSProperties[][] =>
    table.map(row => row.map(() => ({})));

export const isCorrect = ({ col }: Point, results: number[], value: string): boolean => {
    if (col === Math.max(...results) + 1 && value.toLowerCase() === "gotcha") {
        return true;
    }

    if (col < Math.max(...results) + 1 && value.toLowerCase().includes("add")) {
        return true;
    }

    return false;
};

export const isLastCell = ({ col }: Point, results: number[]): boolean => {
    return col === Math.max(...results) + 1;
};
