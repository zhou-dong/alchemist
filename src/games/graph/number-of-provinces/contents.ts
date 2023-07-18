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
            const set: Set<DisjointSetNode> = new Set();
            Array
                .from(this.map.values())
                .map(node => this.findRootByNode(node))
                .forEach(node => set.add(node));
            return set.size;
        }

        union(a: number, b: number) {
            const rootA = this.findRootByValue(a);
            const rootB = this.findRootByValue(b);
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

        private findRootByValue(value: number): DisjointSetNode {
            const node = this.getNode(value);
            return this.findRootByNode(node);
        }

        private findRootByNode(node: DisjointSetNode): DisjointSetNode {
            if (node.parent === node) {
                return node;
            }
            node.parent = this.findRootByNode(node.parent);
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

    return disjointSet.countRoots();
};`;

export const description = `There are **n** cities. Some of them are connected, while some are not. 
If city **a** is connected directly with city **b**, and city **b** is connected directly with city **c**, then city **a** is connected indirectly with city **c**.

A **province** is a group of directly or indirectly connected cities and no other cities outside of the group.

You are given an **n x n** matrix **isConnected** where **isConnected[i][j] = 1** if the **i_th** city and the **j_th** city are directly connected, and **isConnected[i][j] = 0** otherwise.

Return the total number of **provinces**.`;

export const usecases = '';

export const example = ``;
