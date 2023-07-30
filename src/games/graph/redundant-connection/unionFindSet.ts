// union find set has another name: disjoint set
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

    readonly map: Map<number, DisjointSetNode>;

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
            rootB.parent = rootA;
        } else if (rootA.rank > rootB.rank) {
            rootB.parent = rootA;
        } else {
            rootA.parent = rootB;
        }
    }

    find(value: number): DisjointSetNode {
        const node = this.getNode(value);
        return this.findRoot(node);
    }

    private findRoot(node: DisjointSetNode): DisjointSetNode {
        if (node.parent === node) {
            return node;
        }
        node.parent = this.findRoot(node.parent);
        return node.parent;
    }

    private getNode(value: number): DisjointSetNode {
        if (!this.map.has(value)) {
            this.map.set(value, new DisjointSetNode(value));
        }
        return this.map.get(value)!;
    }
}
