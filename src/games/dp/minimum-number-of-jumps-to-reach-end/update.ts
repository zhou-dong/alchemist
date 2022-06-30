import { Point } from "../_commons/point";

export const max = Number.MAX_SAFE_INTEGER;

export const isMatch = ({ col }: Point, r: number, c: number) => {
    return (r === 2 && col + 1 === c);
};

const getValue = (value: number) => (value === max) ? 'x' : value;

export const createNewTableStyles = (table: React.CSSProperties[][]): React.CSSProperties[][] =>
    table.map(row => row.map(() => ({})));

export const updateTable = (table: (string | number)[][], point: Point, value: number): (string | number)[][] =>
    table.map((row, rowIndex) => {
        return row.map((cell, colIndex) => isMatch(point, rowIndex, colIndex) ? getValue(value) : cell);
    });

export const nonCorrect = (comparedTable: (string | number)[][], { row, col }: Point, value: number): boolean =>
    (comparedTable[row][col] !== value);

export const isLastCell = (table: (string | number)[][], { row, col }: Point): boolean => {
    const colLength = table[1].length;
    return row === colLength - 3 && col === colLength - 2;
};

export const getNextPoint = ({ row, col }: Point): Point => {
    if (row + 1 === col) {
        return { row: 0, col: col + 1 };
    } else {
        return { row: row + 1, col };
    }
};
