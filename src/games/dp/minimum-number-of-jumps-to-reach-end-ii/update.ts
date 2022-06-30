import { Point } from "../_commons/point";

export const getLastCell = (table: (string | number)[][]): Point => {
    const row = table.length - 1;
    const col = table[row].length - 1;
    return { row, col };
};

export const createNewTableStyles = (table: React.CSSProperties[][]): React.CSSProperties[][] =>
    table.map(row => row.map(() => ({})));

export const updateTable = (table: (string | number)[][], point: Point, value: number): (string | number)[][] => {
    const cloned = [...table];
    cloned[1][point.col] = value;
    return cloned;
};

export const nonCorrect = (comparedTable: (string | number)[][], { row, col }: Point, value: number): boolean => {
    return (comparedTable[row - 1][col - 1] !== value);
}

export const isLastCell = (table: (string | number)[][], point: Point): boolean => {
    const { row, col } = getLastCell(table);
    return row === 1 && point.col === col;
};

export const getNextPoint = ({ row, col }: Point, inputArray: number[]): Point => {

    const length = inputArray[row - 1];

    const lastCol = row - 1 + length + 1;
    if (col === inputArray.length) {
        return { row: row + 1, col: row + 2 };
    }

    if (col === lastCol) {
        return { row: row + 1, col: row + 2 };
    } else {
        return { row, col: col + 1 };
    }
};
