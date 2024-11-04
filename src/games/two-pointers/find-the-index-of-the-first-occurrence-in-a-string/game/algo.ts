import helperColor from '@mui/material/colors/green';
import helperColorSecondary from '@mui/material/colors/blue';
import helperColorThird from '@mui/material/colors/yellow';

export const helperStyle: React.CSSProperties = { backgroundColor: helperColor[300] };
export const helperStyleSecondary: React.CSSProperties = { backgroundColor: helperColorSecondary[100] };
export const helperStyleThird: React.CSSProperties = { backgroundColor: helperColorThird[200] };
export const errorStyle: React.CSSProperties = { background: "red" }

export enum Action {
    Break,
    return,
    Next,
    DidNotFind,
}

export interface Location {
    row: number;
    col: number;
}

export class Step {
    row: number;
    col: number;
    action: Action;

    constructor(
        row: number,
        col: number,
        action: Action,
    ) {
        this.row = row;
        this.col = col;
        this.action = action;
    }
}

export const buildSteps = function strStr(haystack: string, needle: string): Step[] {
    const steps: Step[] = [];
    for (let i = 0; i <= haystack.length - needle.length; i++) {
        for (let j = 0; j < needle.length; j++) {
            if (haystack.charAt(i + j) !== needle.charAt(j)) {
                const step = new Step(j, i, Action.Break);
                steps.push(step);
                break;
            }
            if (j === needle.length - 1) {
                const step = new Step(j, i, Action.return);
                steps.push(step);
                return steps;
            }
            const step = new Step(j, i, Action.Next);
            steps.push(step);
        }
    }
    const step = new Step(-1, -1, Action.DidNotFind);
    steps.push(step);
    return steps;
};

export const createTable = (haystack: string, needle: string): (number | string)[][] => {
    const rows = needle.length + 2;
    const cols = haystack.length + 2;

    const table: (number | string)[][] = new Array(rows).fill(0).map(() => new Array(cols).fill(""));

    for (let col = 1; col < cols; col++) {
        table[1][col] = col - 1;
    }

    for (let row = 1; row < rows; row++) {
        table[row][1] = row - 1;
    }

    for (let col = 2; col < cols; col++) {
        table[0][col] = haystack.charAt(col - 2);
    }

    for (let row = 2; row < rows; row++) {
        table[row][0] = needle.charAt(row - 2);
    }

    return table;
};

export const createTableStyle = (haystack: string, needle: string): (React.CSSProperties)[][] => {
    const rows = needle.length + 2;
    const cols = haystack.length + 2;
    const table = new Array(rows).fill(0).map(() => new Array(cols).fill({}));
    // addHelperStyles(table, startPoint);
    return table;
};

export const addHelperStyles = (styles: React.CSSProperties[][], point: Location): void => {
    for (let col = 0; col < styles[0].length && col <= point.col; col++) {
        styles[0][col] = helperStyle;
    }

    for (let row = 0; row < styles.length && row <= point.row; row++) {
        styles[row][0] = helperStyle;
    }
};
