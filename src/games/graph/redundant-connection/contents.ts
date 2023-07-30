export const title = "Redundant Connection";

export const formula = `function findRedundantConnection(edges: number[][]): number[] {

    class UnionFindSetNode {
        rank: number;
        parent: UnionFindSetNode;

        constructor() {
            this.rank = 0;
            this.parent = this;
        }
    }

    class UnionFindSet {
        private readonly map: Map<number, UnionFindSetNode>;

        constructor() {
            this.map = new Map();
        }

        union(a: number, b: number) {
            const rootA = this.find(a);
            const rootB = this.find(b);
            if (rootA === rootB) {
                return;
            }
            if (rootA.rank === rootB.rank) {
                rootA.rank += 1;
                rootB.parent = rootA
            } else if (rootA.rank > rootB.rank) {
                rootB.parent = rootA;
            } else {
                rootA.parent = rootB
            }
        }

        find(a: number): UnionFindSetNode {
            const node = this.getNode(a);
            return this.findRoot(node);
        }

        private findRoot(node: UnionFindSetNode): UnionFindSetNode {
            if (node.parent === node) {
                return node;
            }
            node.parent = this.findRoot(node.parent);
            return node.parent;
        }

        private getNode(value: number): UnionFindSetNode {
            if (!this.map.has(value)) {
                this.map.set(value, new UnionFindSetNode());
            }
            return this.map.get(value)!;
        }
    }

    const unionFindSet = new UnionFindSet();

    for (let i = 0; i < edges.length; i++) {
        const [a, b] = edges[i];
        const rootA = unionFindSet.find(a);
        const rootB = unionFindSet.find(b);
        if (rootA !== rootB) {
            unionFindSet.union(a, b);
        } else {
            return [a, b];
        }
    }

    return [];
};`;

export const description = `In this problem, a tree is an **undirected graph** that is connected and has no cycles.

You are given a graph that started as a tree with **n** nodes labeled from **1** to **n**, with one additional edge added. 
The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed. 
The graph is represented as an array edges of length n where edges[i] = [a_i, b_i] indicates that there is an edge between nodes a_i and b_i in the graph.

Return an edge that can be removed so that the resulting graph is a tree of n nodes. If there are multiple answers, return the answer that occurs last in the input.`;

export const usecases = '';

export const example = ``;

export const tips = `// Use union-find-set(disjoint set) to solve this problem
for (let i = 0; i < edges.length; i++) {
    const [a, b] = edges[i];

    const rootA = unionFindSet.find(a);
    const rootB = unionFindSet.find(b);

    if (rootA !== rootB) {
        unionFindSet.union(a, b);
    } else {
        return [a, b];
    }
}`;
