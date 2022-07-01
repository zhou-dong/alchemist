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

export const isLastCell = (table: (string | number)[][], point: Point): boolean => {
    const row = table.length - 1;
    const col = table[row].length - 1;
    return isMatch(point, row, col);
};

export const getNextPoint = (table: (string | number)[][], { row, col }: Point): Point =>
    (col === table[row].length - 1) ? { row: row + 1, col: 2 } : { row, col: col + 1 };

interface Helpers {
    helperTable: (string | number)[][];
    resultsInDifferentFloors: number[];
}

export const createHelperTable = (point: Point, comparedTable: (string | number)[][]): Helpers => {

    const eggs = point.row;
    const floors = point.col - 1;

    let helperTable: (string | number)[][] = [];
    let resultsInDifferentFloors: number[] = [];

    if (eggs > floors) {
        return { helperTable, resultsInDifferentFloors };
    } else {
        for (let floor = 1; floor <= floors; floor++) {

            const row: (string | number)[] = [];
            // floor number
            row.push(floor);

            const breaks = Number(comparedTable[eggs - 1][floor]);
            const nonBreaks = Number(comparedTable[eggs][floors - floor + 1]);

            // breaks
            row.push(`Eggs-1 = ${eggs}-1 = ${eggs - 1}`);
            row.push(`Floor-1 = ${floor}-1 = ${floor - 1}`);
            row.push(`T[${eggs - 1}][${floor - 1}] = ${breaks}`);

            // non-breaks
            row.push(`Eggs = ${eggs}`);
            row.push(`Floors-Floor = ${floors}-${floor} = ${floors - floor}`);
            row.push(`T[${eggs}][${floors - floor}] = ${nonBreaks}`);

            // result
            // row.push(`1+ Max(Breaks, NonBreaks)`);
            row.push(`1 + Max(${breaks}, ${nonBreaks}) = ${1 + Math.max(breaks, nonBreaks)}`);
            resultsInDifferentFloors.push(1 + Math.max(breaks, nonBreaks));

            helperTable.push(row);
        }
    }

    return { helperTable, resultsInDifferentFloors };
};
