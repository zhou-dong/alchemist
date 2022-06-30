import { Point } from "../_commons/point";
import { helperStyle } from '../_commons/styles';

const isMatch = (point: Point, r: number, c: number) => (r === 1 && point.col === c);

export const createNewTableStyles = (table: React.CSSProperties[][]): React.CSSProperties[][] =>
    table.map(row => row.map(() => ({})));

export const updateTable = (table: number[][], point: Point, value: number): number[][] =>
    table.map((row, rowIndex) => {
        return row.map((cell, colIndex) => isMatch(point, rowIndex, colIndex) ? value : cell);
    });

export const nonCorrect = (comparedTable: number[][], { row, col }: Point, value: number): boolean =>
    (comparedTable[row][col] !== value);

export const isLastCell = (table: number[][], { row, col }: Point): boolean => {
    return row === table.length - 1 && col === table[row].length - 1;
};

export const setSuccessStyle = (table: number[][], styles: React.CSSProperties[][]): void => {
    const max = Math.max(...table[1]);
    for (let col = 0; col < table[1].length; col++) {
        if (table[1][col] === max) {
            styles[1][col] = helperStyle;
        }
    }
};

export const getNextPoint = ({ row, col }: Point): Point => {
    if (col === row) {
        return { row: 1, col: col + 1 };
    } else {
        return { row: row + 1, col };
    }
};
