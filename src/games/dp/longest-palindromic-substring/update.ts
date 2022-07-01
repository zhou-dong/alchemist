import { Point } from "../_commons/point";

export const getValue = (value: boolean) => value ? 'T' : 'F';

const isMatch = ({ row, col }: Point, r: number, c: number) => (row === r && col === c);

export const createNewTableStyles = (table: React.CSSProperties[][]): React.CSSProperties[][] =>
    table.map(row => row.map(() => ({})));

export const updateTable = (table: (string | boolean)[][], point: Point, value: boolean): (string | boolean)[][] => {
    const result: (string | boolean)[][] = table.map((row, rowIndex) => {
        return row.map((cell, colIndex) => isMatch(point, rowIndex, colIndex) ? getValue(value) : cell);
    });
    return result;
};

export const nonCorrect = (comparedTable: (string | boolean)[][], { row, col }: Point, value: boolean): boolean =>
    (comparedTable[row][col] !== value);

export const isLastCell = (table: (string | boolean)[][], { row, col }: Point): boolean => {
    return row === 2 && col === table[row].length - 1;
};

export const getNext = (table: (string | boolean)[][], { row, col }: Point, length: number) => {
    const isNextLen = row + length === table.length;
    const nextLength = isNextLen ? length + 1 : length;
    const nextRow = isNextLen ? 2 : row + 1;
    const nextCol = isNextLen ? nextRow + nextLength - 1 : col + 1;

    return { row: nextRow, col: nextCol, length: nextLength };
};
