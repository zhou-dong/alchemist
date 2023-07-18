import { Point } from "../../commons/point";

const random = (): number => Math.floor(Math.random() * 4);

export const buildBoard = (rows: number, cols: number): string[][] => {
    const board: string[][] = [];
    for (let row = 0; row < rows; row++) {
        board.push([]);
        for (let col = 0; col < cols; col++) {
            const value = random() ? "X" : "O";
            board[row].push(value);
        }
    }
    return board;
}

const cloneGrid = (grid: string[][]): string[][] => grid.map(row => [...row]);

export enum Direction {
    Up, Right, Down, Left, StartDFS, SkipDFS, Update
}

export interface Step {
    board: string[][];
    point: Point;
    direction?: Direction;
}

export const buildSteps = (board: string[][]): Step[] => {

    const steps: Step[] = [];

    const inArea = (row: number, col: number): boolean => {
        return row >= 0 && row < board.length && col >= 0 && col < board[row].length;
    }

    const dfs = (row: number, col: number, direction: Direction) => {
        if (!inArea(row, col)) {
            return;
        }
        if (board[row][col] !== "O") {
            return
        }
        steps.push({ board: cloneGrid(board), point: { row, col }, direction });
        board[row][col] = "#";
        dfs(row - 1, col, Direction.Up);
        dfs(row, col + 1, Direction.Right);
        dfs(row + 1, col, Direction.Down);
        dfs(row, col - 1, Direction.Left);
    }

    for (let row = 0; row < board.length; row++) {
        if (board[row][0] !== "O") {
            steps.push({ board: cloneGrid(board), point: { row, col: 0 }, direction: Direction.SkipDFS });
        }
        dfs(row, 0, Direction.StartDFS);
        if (board[row][board[row].length - 1] !== "O") {
            steps.push({ board: cloneGrid(board), point: { row, col: board[row].length - 1 }, direction: Direction.SkipDFS });
        }
        dfs(row, board[row].length - 1, Direction.StartDFS);
    }

    for (let col = 1; col < board[0].length - 1; col++) {
        if (board[0][col] !== "O") {
            steps.push({ board: cloneGrid(board), point: { row: 0, col }, direction: Direction.SkipDFS });
        }
        dfs(0, col, Direction.StartDFS);
        if (board[board.length - 1][0] !== "O") {
            steps.push({ board: cloneGrid(board), point: { row: board.length - 1, col }, direction: Direction.SkipDFS });
        }
        dfs(board.length - 1, col, Direction.StartDFS);
    }

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col] === 'O') {
                board[row][col] = 'X';
            } else if (board[row][col] === "#") {
                board[row][col] = 'O';
            }
            steps.push({ board: cloneGrid(board), point: { row, col }, direction: Direction.Update });
        }
    }

    return steps;
}
