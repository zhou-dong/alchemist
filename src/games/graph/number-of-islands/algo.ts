import { Point } from "../../commons/point";

const random = (): number => Math.round(Math.random());

export const buildGrid = (rows: number, cols: number): number[][] => {
    const grid: number[][] = [];
    for (let row = 0; row < rows; row++) {
        grid.push([]);
        for (let col = 0; col < cols; col++) {
            grid[row].push(random());
        }
    }
    return grid;
}

const cloneGrid = (grid: number[][]): number[][] => grid.map(row => [...row]);

export enum Direction {
    Left, Right, Up, Down
}

export interface Step {
    grid: number[][];
    point: Point;
    direction?: Direction;
    numIslands: number;
}

export const buildSteps = (grid: number[][]): Step[] => {

    const steps: Step[] = [];

    let numIslands = 0;

    const land = 1;
    const visited = 2;

    const inArea = (row: number, col: number): boolean => {
        return row >= 0 && row < grid.length && col >= 0 && col < grid[row].length;
    }

    const dfs = (row: number, col: number, direction?: Direction) => {
        if (!inArea(row, col)) {
            return;
        }
        if (grid[row][col] !== land) {
            return
        }

        grid[row][col] = visited;
        steps.push({ grid: cloneGrid(grid), direction, point: { row, col }, numIslands });

        dfs(row - 1, col, Direction.Up);
        dfs(row, col + 1, Direction.Right);
        dfs(row + 1, col, Direction.Down);
        dfs(row, col - 1, Direction.Left);
    }

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            steps.push({ grid: cloneGrid(grid), point: { row, col }, numIslands });
            if (grid[row][col] === land) {
                numIslands += 1;
                dfs(row, col);
            }
        }
    }

    return steps;
}
