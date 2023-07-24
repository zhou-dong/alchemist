import { GraphNode } from "./node.interface";
import { GraphEdge } from "./edge.interface";
import { SimpleGraphSkin, SimpleGraphText } from "./node.three";
import { SimpleDirectedGraphEdge, SimpleUndirectedGraphEdge } from "./edge.three";
import Displayer from "../_commons/params/displayer.interface";

type LayoutMapping = { [key: number]: { x: number; y: number } };

export class Graph<T> implements Displayer {

    readonly nodes: GraphNode<T>[];
    readonly edges: GraphEdge<T>[];

    constructor(nodes: GraphNode<T>[] = [], edges: GraphEdge<T>[] = []) {
        this.nodes = nodes;
        this.edges = edges;
    }

    show() {
        this.nodes.forEach(node => {
            node.show();
        });
        this.edges.forEach(edge => {
            edge.show();
        });
    };

    hide() {
        this.nodes.forEach(node => {
            node.hide();
        });
        this.edges.forEach(edge => {
            edge.hide();
        });
    };

    setPositions(calculatorPositions: (graph: Graph<T>) => LayoutMapping) {
        const positions = calculatorPositions(this);
        this.nodes.forEach(node => this.setNodePosition(node, positions));
        this.edges.forEach(edge => edge.refresh());
    }

    private setNodePosition(node: GraphNode<T>, positions: LayoutMapping) {
        const { x, y } = positions[node.id];
        node.skin.x = x;
        node.skin.y = y;
        node.text.x = x - 0.3;
        node.text.y = y - 0.3;
    }

    addNode(node: GraphNode<T>) {
        this.nodes.push(node);
    }

    dropNode(node: GraphNode<T>) {
        const index = this.nodes.indexOf(node);
        if (index > -1) {
            this.nodes.splice(index, 1);
            node.hide();
        }
    }

    addEdge(edge: GraphEdge<T>) {
        this.edges.push(edge);
    }

    dropEdge(edge: GraphEdge<T>) {
        const index = this.edges.indexOf(edge);
        if (index > -1) {
            this.edges.splice(index, 1);
            edge.hide();
        }
    }
}

const buildGraphNodes = <T>(
    nodeSkinColor: string,
    nodeTextColor: string,
    adjacency: T[][],
    scene: THREE.Scene
): Map<T, GraphNode<T>> => {
    const nodes: Set<T> = new Set();
    adjacency.forEach(connection => {
        const [a, b] = connection;
        nodes.add(a);
        nodes.add(b);
    });

    const nodeMap: Map<T, GraphNode<T>> = new Map();
    let index = 0;
    nodes.forEach(node => {
        const graphSkin = new SimpleGraphSkin(scene, nodeSkinColor);
        const graphText = new SimpleGraphText(node + "", scene, nodeTextColor);
        const graphNode = new GraphNode<T>(index, node, graphSkin, graphText);
        nodeMap.set(node, graphNode);
        index += 1;
    });

    return nodeMap;
};

export class SimpleDirectedGraph<T> extends Graph<T> {

    constructor(
        nodeSkinColor: string,
        nodeTextColor: string,
        edgeColor: string,
        adjacency: T[][],
        scene: THREE.Scene
    ) {
        const nodeMap = buildGraphNodes(nodeSkinColor, nodeTextColor, adjacency, scene);
        const edges: GraphEdge<T>[] = [];
        adjacency.forEach(connection => {
            const [a, b] = connection;
            const source: GraphNode<T> = nodeMap.get(a)!;
            const target: GraphNode<T> = nodeMap.get(b)!;
            const edge = new SimpleDirectedGraphEdge(source, target, scene, edgeColor);
            edges.push(edge);
        });
        super(Array.from(nodeMap.values()), edges);
    }

}

export class SimpleUndirectedGraph<T> extends Graph<T> {

    constructor(
        nodeSkinColor: string,
        nodeTextColor: string,
        edgeColor: string,
        adjacency: T[][],
        scene: THREE.Scene
    ) {
        const nodeMap = buildGraphNodes(nodeSkinColor, nodeTextColor, adjacency, scene);
        const edges: GraphEdge<T>[] = [];
        adjacency.forEach(connection => {
            const [a, b] = connection;
            const source: GraphNode<T> = nodeMap.get(a)!;
            const target: GraphNode<T> = nodeMap.get(b)!;
            const edge = new SimpleUndirectedGraphEdge(source, target, scene, edgeColor);
            edges.push(edge);
        });
        super(Array.from(nodeMap.values()), edges);
    }

}
