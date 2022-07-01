import { Point } from "../_commons/point";

const isMatch = ({ row, col }: Point, r: number, c: number) => (row === r && col === c);

export const createNewTableStyles = (table: React.CSSProperties[][]): React.CSSProperties[][] =>
    table.map(row => row.map(() => ({})));

export const updateTable = (table: (string | number)[][], point: Point, value: number): (string | number)[][] =>
    table.map((row, rowIndex) => {
        return row.map((cell, colIndex) => isMatch(point, rowIndex, colIndex) ? value : cell);
    });

export const nonCorrect = (comparedTable: (string | number)[][], { row, col }: Point, value: number): boolean =>
    (comparedTable[row][col] !== value);

export const isLastCell = (table: (string | number)[][], { row, col }: Point): boolean => {
    return row === 2 && col === table[row].length - 1;
};

export const getNext = (table: (string | number)[][], { row, col }: Point, length: number) => {
    const isNextLen = row + length === table.length;
    const nextLength = isNextLen ? length + 1 : length;
    const nextRow = isNextLen ? 2 : row + 1;
    const nextCol = isNextLen ? nextRow + nextLength - 1 : col + 1;

    return { row: nextRow, col: nextCol, length: nextLength };
};
