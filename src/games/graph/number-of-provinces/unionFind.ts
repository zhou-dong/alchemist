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

export class DisjointSet {

    private readonly map: Map<number, DisjointSetNode>;

    constructor() {
        this.map = new Map();
    }

    getRoots(): number[] {
        const set: Set<DisjointSetNode> = new Set();
        Array
            .from(this.map.values())
            .map(node => node.parent)
            .forEach(node => set.add(node));

        return Array.from(set).map(node => node.value);
    }

    getRoots1(): number[] {
        const set: Set<DisjointSetNode> = new Set();
        Array
            .from(this.map.values())
            .map(node => this.findRootByNode(node))
            .forEach(node => set.add(node));

        return Array.from(set).map(node => node.value);
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

    findRootByValue(value: number): DisjointSetNode {
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
