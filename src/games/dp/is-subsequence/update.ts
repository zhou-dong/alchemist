import { Point } from "../_commons/point";

export const getLastCell = (table: (string | boolean)[][]): Point => {
    const row = table.length - 1;
    const col = table[row].length - 1;
    return { row, col };
};

const booleanToString = (value: boolean | string): string => {
    if (value === "?")
        return value;
    return (value ? 'T' : 'F');
};

export const isMatch = ({ row, col }: Point, r: number, c: number) => (row === r && col === c);

export const createNewTableStyles = (table: React.CSSProperties[][]): React.CSSProperties[][] =>
    table.map(row => row.map(() => ({})));

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

export const isLastRow = (table: (string | boolean)[][], point: Point): boolean => {
    return point.row === table.length - 1;
};

export const isSuccessCell = (table: (string | boolean)[][], point: Point): boolean => {
    if (!isLastRow(table, point)) {
        return false;
    }

    return table[point.row][point.col] === true || table[point.row][point.col] === 'T';
};
