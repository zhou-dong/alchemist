import { Point } from "../_commons/point";
import { helperStyle, helperStyleSecondary, helperStyleThird } from '../_commons/styles';

export const addHelperStyles = (styles: React.CSSProperties[][], { row, col }: Point, comparedTable: (number | string)[][]) => {
    const itemWeight: number = Number(comparedTable[row][1]);
    const currentWeight: number = col - 2;

    styles[0][col] = helperStyleThird;
    styles[row][1] = helperStyleThird;

    styles[row - 1][col] = helperStyleSecondary;
    styles[row][0] = helperStyle;
    if (itemWeight <= currentWeight) {
        styles[row - 1][col - itemWeight] = helperStyle;
    }
};

export const getLastCell = (table: (string | number)[][]): Point => {
    const row = table.length - 1;
    const col = table[row].length - 1;
    return { row, col };
};

const isMatch = ({ row, col }: Point, r: number, c: number) => (row === r && col === c);

export const createNewTableStyles = (table: React.CSSProperties[][]): React.CSSProperties[][] =>
    table.map(row => row.map(() => ({})));

export const updateTable = (table: (string | number)[][], point: Point, value: number | string): (string | number)[][] =>
    table.map((row, rowIndex) => {
        return row.map((cell, colIndex) => isMatch(point, rowIndex, colIndex) ? value : cell);
    });

export const nonCorrect = (comparedTable: (string | number)[][], { row, col }: Point, value: number): boolean =>
    (comparedTable[row][col] !== value);

export const isLastCell = (table: (string | number)[][], point: Point): boolean => {
    const { row, col } = getLastCell(table);
    return isMatch(point, row, col);
};

export const getNextPoint = (table: (string | number)[][], { row, col }: Point): Point =>
    (col === table[row].length - 1) ? { row: row + 1, col: 3 } : { row, col: col + 1 };
