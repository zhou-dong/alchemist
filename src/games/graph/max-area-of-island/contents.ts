export const title = 'Max Area of Island';

export const formula = `function maxAreaOfIsland(grid: number[][]): number {

    const inArea = (row: number, col: number): boolean => {
        return row >= 0 && row < grid.length && col >= 0 && col < grid[row].length;
    }

    const dfs = (row: number, col: number): number => {
        if (!inArea(row, col)) {
            return 0;
        }
        if (grid[row][col] !== 1) {
            return 0;
        }
        grid[row][col] = 2;
        return 1 + dfs(row - 1, col) + dfs(row, col + 1) + dfs(row + 1, col) + dfs(row, col - 1);
    }

    let max = 0;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            max = Math.max(max, dfs(row, col));
        }
    }

    return max;
};`;

export const description = `
You are given an **m x n** binary matrix **grid**. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

The **area** of an island is the number of cells with a value **1** in the island.

Return the **maximum** area of an island in grid. If there is no island, return 0.
`;

export const usecases = '';

export const example = `
`;
