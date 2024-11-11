import helperColor from '@mui/material/colors/green';

const helperStyle: React.CSSProperties = { backgroundColor: helperColor[300] };
const helperStyle2: React.CSSProperties = { backgroundColor: helperColor[500], color: "#fff" };

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

export const createTableStyle = (haystack: string, needle: string): React.CSSProperties[][] => {
    const rows = needle.length + 2;
    const cols = haystack.length + 2;
    const table = new Array(rows).fill(0).map(() => new Array(cols).fill({}));
    return table;
};

export const createHelperStyle = (haystack: string, needle: string, { row, col }: Location): React.CSSProperties[][] => {
    const style: React.CSSProperties[][] = createTableStyle(haystack, needle);
    for (let c = col, r = 2; c <= row + col; c++, r++) {
        style[0][c + 2] = helperStyle;
        style[r][0] = helperStyle;
        style[r][col + 2] = helperStyle2;
    }
    return style
};
