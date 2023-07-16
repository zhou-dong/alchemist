export const title = 'Number of Islands';

export const formula = `function numIslands(grid: string[][]): number {

    const land = "1";
    const visited = "2";

    const inArea = (row: number, col: number): boolean => {
        return row >= 0 && row < grid.length && col >= 0 && col < grid[row].length;
    }

    const dfs = (row: number, col: number) => {
        if (!inArea(row, col)) {
            return;
        }
        if (grid[row][col] !== land) {
            return
        }
        grid[row][col] = visited;
        dfs(row - 1, col);
        dfs(row, col + 1);
        dfs(row + 1, col);
        dfs(row, col - 1);
    }

    let result = 0;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === land) {
                result += 1;
                dfs(row, col);
            }
        }
    }

    return result;
};`;

export const description = `
Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. 

You may assume all four edges of the grid are all surrounded by water.
`;

export const usecases = '';

export const example = `
`;
