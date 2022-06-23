import createDPTable from './algo';
import { Point } from "../_commons/point";
import { addHelperStyles } from "./utils";

const startPoint: Point = {
    row: 2,
    col: 2,
};

const createTableMatrix = (stringOne: string, stringTwo: string): (number | string)[][] => {
    const rows = stringTwo.length + 2;
    const cols = stringOne.length + 2;

    const table = new Array(rows).fill('').map(() => new Array(cols).fill(''));

    for (let col = 2; col < cols; col++) {
        table[0][col] = stringOne.charAt(col - 2);
        table[1][col] = col - 1;
    }

    for (let row = 2; row < rows; row++) {
        table[row][0] = stringTwo.charAt(row - 2);
        table[row][1] = row - 1;
    }

    table[1][1] = 0;
    table[2][2] = '?';
    return table;
};

const createComparedTable = (stringOne: string, stringTwo: string): (number | string)[][] => {
    const rows = stringTwo.length + 2;
    const cols = stringOne.length + 2;

    const dpTable = createDPTable(stringOne, stringTwo);
    const tableMatrix = createTableMatrix(stringOne, stringTwo);

    for (let row = 1; row < rows; row++) {
        for (let col = 1; col < cols; col++) {
            tableMatrix[row][col] = dpTable[row - 1][col - 1];
        }
    }
    return tableMatrix;
};

const createTableStyles = (stringOne: string, stringTwo: string): (React.CSSProperties)[][] => {
    const rows = stringTwo.length + 2;
    const cols = stringOne.length + 2;
    const table = new Array(rows).fill(0).map(() => new Array(cols).fill({}));
    addHelperStyles(table, startPoint);
    return table;
};

const createButtons = (stringOne: string, stringTwo: string): number[] => {
    const dpTable = createDPTable(stringOne, stringTwo);
    const set = new Set<number>();
    for (let row = 1; row < dpTable.length; row++) {
        for (let col = 1; col < dpTable[row].length; col++) {
            set.add(dpTable[row][col]);
        }
    }
    return Array.from(set).sort();
};

const createButtonsStyles = (stringOne: string, stringTwo: string): (React.CSSProperties)[] => {
    return createButtons(stringOne, stringTwo).map(() => ({ color: 'back' }));
};

export {
    addHelperStyles,
    createTableMatrix,
    createComparedTable,
    createTableStyles,
    createButtons,
    createButtonsStyles,
    startPoint,
};
