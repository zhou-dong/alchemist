import { DisjointSet } from "./unionFindSet";

export function buildAdjacencyList(edges: number[][]): number[][] {

    const disjointSet = new DisjointSet();

    edges.forEach(edge => {
        const [a, b] = edge;
        disjointSet.union(a, b);
    })

    return Array
        .from(disjointSet.map.values())
        .map(node => [node.value, node.parent.value]);
}
