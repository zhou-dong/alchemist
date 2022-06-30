import { Point } from "../_commons/point";

export const getLastCell = (table: (string | boolean)[][]): Point => {
    const row = table.length - 1;
    const col = table[row].length - 1;
    return { row, col };
};

const isMatch = ({ row, col }: Point, r: number, c: number) => (row === r && col === c);

export const createNewTableStyles = (table: React.CSSProperties[][]): React.CSSProperties[][] => {
    return table.map(row => row.map(() => ({})));
};

const booleanToString = (value: boolean | string): string => {
    if (value === "?")
        return value;
    return (value ? 'T' : 'F');
};

export const updateTable = (table: (string | boolean)[][], point: Point, value: boolean | string): (string | boolean)[][] =>
    table.map((row, rowIndex) => {
        return row.map((cell, colIndex) => isMatch(point, rowIndex, colIndex) ? booleanToString(value) : cell);
    });

export const nonCorrect = (comparedTable: (string | boolean)[][], { row, col }: Point, value: boolean): boolean =>
    (comparedTable[row][col] !== value);

export const isLastCell = (table: (string | boolean)[][], point: Point): boolean => {
    const { row, col } = getLastCell(table);
    return isMatch(point, row, col);
};

export const getNextPoint = (table: (string | boolean)[][], { row, col }: Point): Point =>
    (col === table[row].length - 1) ? { row: row + 1, col: 2 } : { row, col: col + 1 };
