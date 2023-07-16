import { Point } from "../../dp/_commons/point";

export const getLastCell = (table: (string | number)[][]): Point => {
    const row = table.length - 1;
    const col = table[row].length - 1;
    return { row, col };
};

export const isMatch = ({ row, col }: Point, r: number, c: number) => (row === r && col === c);

export const createNewTableStyles = (table: React.CSSProperties[][]): React.CSSProperties[][] => {
    return table.map(row => row.map(() => ({})));
};

export const updateTable = (table: (string | number)[][], point: Point, value: number | string): (string | number)[][] => {
    return table.map((row, rowIndex) => {
        return row.map((cell, colIndex) => isMatch(point, rowIndex, colIndex) ? value : cell);
    });
};

export const nonCorrect = (comparedTable: (string | number)[][], { row, col }: Point, value: number): boolean => {
    return (comparedTable[row][col] !== value);
}

export const isLastCell = (table: (string | number)[][], point: Point): boolean => {
    const { row, col } = getLastCell(table);
    return isMatch(point, row, col);
};

export const getNextPoint = (table: (string | number)[][], { row, col }: Point): Point => {
    return (col === table[row].length - 1) ? { row: row + 1, col: 2 } : { row, col: col + 1 };
};
