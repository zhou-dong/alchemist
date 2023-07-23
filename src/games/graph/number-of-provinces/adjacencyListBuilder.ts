export function buildAdjacencyList(isConnected: number[][]): number[][] {
    const adjacency: number[][] = [];

    for (let row = 0; row < isConnected.length; row++) {
        for (let col = 0; col < isConnected[row].length; col++) {
            if (isConnected[row][col] === 1) {
                adjacency.push([row, col]);
            }
        }
    }

    return adjacency;
}
