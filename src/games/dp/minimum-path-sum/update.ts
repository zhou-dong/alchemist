import { Point } from "../_commons/point";

const isMatch = ({ row, col }: Point, r: number, c: number) => (row === r && col === c);

export const getLastPoint = (table: any[][]): Point => {
    const row = table.length - 1;
    const col = table[row].length - 1;
    return { row, col };
};

export const createNewTableStyles = (table: React.CSSProperties[][]): React.CSSProperties[][] =>
    table.map(row => row.map(() => ({})));

export const updateTable = (table: (number)[][], point: Point, value: number): (number)[][] =>
    table.map((row, rowIndex) => {
        return row.map((cell, colIndex) => isMatch(point, rowIndex, colIndex) ? value : cell);
    });

export const nonCorrect = (comparedTable: (string | number)[][], { row, col }: Point, value: number): boolean =>
    (comparedTable[row][col] !== value);

export const isLastCell = (table: (string | number)[][], point: Point): boolean => {
    const row = table.length - 1;
    const col = table[row].length - 1;
    return isMatch(point, row, col);
};

export const getNextPoint = (table: (string | number)[][], { row, col }: Point): Point => {
    if (row === 0) {
        if (col === table[0].length - 1) {
            return { row: 1, col: 0 };
        } else {
            return { row, col: col + 1 };
        }
    } else if (row !== 0 && col === 0) {
        if (row === table.length - 1) {
            return { row: 1, col: 1 };
        } else {
            return { row: row + 1, col };
        }
    } else {
        if (col === table[row].length - 1) {
            return { row: row + 1, col: 1 };
        } else {
            return { row, col: col + 1 };
        }
    }
};
