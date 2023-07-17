export const title = 'Surrounded Regions';

export const formula = `function solve(board: string[][]): void {

    const mark = "#";

    const inArea = (row: number, col: number): boolean => {
        return row >= 0 && col >= 0 && row < board.length && col < board[row].length;
    }

    const dfs = (row: number, col: number) => {
        if (!inArea(row, col)) {
            return;
        }
        if (board[row][col] !== "O") {
            return;
        }
        board[row][col] = mark;
        dfs(row - 1, col);
        dfs(row, col + 1);
        dfs(row + 1, col);
        dfs(row, col - 1);
    }

    for (let row = 0; row < board.length; row++) {
        dfs(row, 0);
        dfs(row, board[row].length - 1);
    }

    for (let col = 1; col < board[0].length - 1; col++) {
        dfs(0, col);
        dfs(board.length - 1, col);
    }

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col] === 'O') {
                board[row][col] = 'X';
            } else if (board[row][col] === mark) {
                board[row][col] = 'O';
            }
        }
    }
};`;

export const description = `
Given an m x n matrix board containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'.

A region is captured by flipping all 'O's into 'X's in that surrounded region.
`;

export const usecases = '';

export const example = "";
