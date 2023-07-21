class DisjointSetNode {
    value: number;
    rank: number;
    parent: DisjointSetNode;

    constructor(value: number) {
        this.value = value;
        this.rank = 0;
        this.parent = this;
    }
}

class DisjointSet {

    readonly map: Map<number, DisjointSetNode>;

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
            this.map.set(value, new DisjointSetNode(value));
        }
        return this.map.get(value)!;
    }
}

export function buildDisjointSet(isConnected: number[][]): DisjointSet {
    const disjointSet = new DisjointSet();

    for (let row = 0; row < isConnected.length; row++) {
        for (let col = 0; col < isConnected[row].length; col++) {
            if (isConnected[row][col] === 1) {
                disjointSet.union(row, col);
            }
        }
    }

    disjointSet.countRoots() // compress
    return disjointSet;
}

export function buildAdjacencyList(isConnected: number[][]): number[][] {
    const adjacency: number[][] = [];
    const disjointSet = buildDisjointSet(isConnected);

    for (let row = 0; row < isConnected.length; row++) {
        for (let col = 0; col < isConnected[row].length; col++) {
            if (isConnected[row][col] === 1) {
                // disjointSet.union(row, col);
                adjacency.push([row, col]);
            }
        }
    }

    console.log(adjacency);

    Array.from(disjointSet.map.values()).forEach(node => {
        // if (node !== node.parent) {
        //     adjacency.push([node.value, node.parent.value]);
        // }
    });

    return adjacency;
}
