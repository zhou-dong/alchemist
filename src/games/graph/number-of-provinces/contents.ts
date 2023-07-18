export const title = "Number of Provinces";

export const formula = `function findCircleNum(isConnected: number[][]): number {

    class DisjointSetNode {
        rank: number;
        parent: DisjointSetNode;

        constructor() {
            this.rank = 0;
            this.parent = this;
        }
    }

    class DisjointSet {

        private readonly map: Map<number, DisjointSetNode>;

        constructor() {
            this.map = new Map();
        }

        countRoots(): number {
            const roots = Array.from(this.map.values()).map(node => node.parent);
            return new Set(roots).size;
        }

        union(a: number, b: number) {
            const rootA = this.findSet(a);
            const rootB = this.findSet(b);
            if (rootA === rootB) {
                return;
            }
            if (rootA.rank === rootB.rank) {
                rootA.rank += 1;
                rootB.parent = rootA;
            } else if (rootA.rank > rootB.rank) {
                rootB.parent = rootA;
            } else {
                rootA.parent = rootB;
            }
        }

        compress() {
            for (const node of this.map.values()) {
                this.findParent(node);
            }
        }

        private findSet(value: number): DisjointSetNode {
            const node = this.getNode(value);
            return this.findParent(node);
        }

        private findParent(node: DisjointSetNode): DisjointSetNode {
            if (node.parent === node) {
                return node;
            }
            node.parent = this.findParent(node.parent);
            return node.parent;
        }

        private getNode(value: number): DisjointSetNode {
            if (!this.map.has(value)) {
                this.map.set(value, new DisjointSetNode());
            }
            return this.map.get(value);
        }
    }

    const disjointSet = new DisjointSet();

    for (let row = 0; row < isConnected.length; row++) {
        for (let col = 0; col < isConnected[row].length; col++) {
            if (isConnected[row][col] === 1) {
                disjointSet.union(row, col);
            }
        }
    }

    disjointSet.compress();

    return disjointSet.countRoots();
};`;

export const description = ``;

export const usecases = '';

export const example = ``;
