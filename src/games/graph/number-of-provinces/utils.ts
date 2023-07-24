import { DisjointSet } from "./unionFind";

export interface ResultNumberOfProvinces {
    roots: number[];
}

export interface Step {
    row: number;
    col: number;
}

export function buildSteps(isConnected: number[][]): Step[] {
    const steps: Step[] = [];

    for (let row = 0; row < isConnected.length; row++) {
        for (let col = row; col < isConnected[row].length; col++) {
            if (isConnected[row][col] === 1) {
                steps.push({ row, col });
            }
        }
    }

    return steps;
}

export function buildAdjacencyList(isConnected: number[][]): number[][] {
    const adjacency: number[][] = [];

    for (let row = 0; row < isConnected.length; row++) {
        for (let col = row; col < isConnected[row].length; col++) {
            if (isConnected[row][col] === 1) {
                adjacency.push([row, col]);
            }
        }
    }

    return adjacency;
}

export function getRoots(isConnected: number[][]): number[] {

    const disjointSet = new DisjointSet();

    for (let row = 0; row < isConnected.length; row++) {
        for (let col = row; col < isConnected[row].length; col++) {
            if (isConnected[row][col] === 1) {
                disjointSet.union(row, col);
            }
        }
    }

    return disjointSet.getRoots()
}
