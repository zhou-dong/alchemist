import { Point } from "../_commons/point";

export const getLastPoint = (table: (string | boolean)[][]): Point => {
    const row = 2;
    const col = table[row].length - 1;
    return { row, col };
};

const booleanToString = (value: boolean | string): string => {
    if (value === "?")
        return value;
    return (value ? 'T' : 'F');
};

const isMatch = ({ row, col }: Point, r: number, c: number) => (row === r && col === c);

export const createNewTableStyles = (table: React.CSSProperties[][]): React.CSSProperties[][] =>
    table.map(row => row.map(() => ({})));

export const updateTable = (table: (string | boolean)[][], point: Point, value: boolean | string): (string | boolean)[][] =>
    table.map((row, rowIndex) => {
        return row.map((cell, colIndex) => isMatch(point, rowIndex, colIndex) ? booleanToString(value) : cell);
    });

export const nonCorrect = (comparedTable: (string | boolean)[][], { row, col }: Point, value: boolean): boolean =>
    (comparedTable[row][col] !== value);

export const isLastCell = (table: (string | boolean)[][], { row, col }: Point): boolean => {
    return row === 2 && col === table[2].length - 1;
};

export const createNextCol = (col: number, len: number, table: (string | boolean)[][]): number => {
    const nextCol = (col + 1) % table.length;
    return nextCol < 2 ? 1 + len : nextCol;
};

export const getNextPoint = (table: (string | boolean)[][], { row, col }: Point, length: number) => {
    const nextRow = col + 1 === table.length ? 2 : row + 1;
    const nextLen = col + 1 === table.length ? length + 1 : length;
    const nextCol = createNextCol(col, nextLen, table);
    return { row: nextRow, col: nextCol, length: nextLen };
};
