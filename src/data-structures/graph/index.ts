import Graphology from "graphology";
import forceAtlas2 from 'graphology-layout-forceatlas2';
import { GraphNode } from "./node.interface";
import { GraphEdge } from "./edge.interface";
import { SimpleGraphSkin, SimpleGraphText } from "./node.three";
import { SimpleDirectedGraphEdge, SimpleUndirectedGraphEdge } from "./edge.three";

export class Graph<T> {

    readonly nodes: GraphNode<T>[];
    readonly edges: GraphEdge<T>[];

    constructor(nodes: GraphNode<T>[], edges: GraphEdge<T>[]) {
        this.nodes = nodes;
        this.edges = edges;
        this.resetPositions();
    }

    resetPositions() {
        const positions = this.computePositions();

        this.nodes.forEach(node => {
            const { x, y } = positions[node.id];
            node.skin.position.x = x;
            node.skin.position.y = y;
            node.text.position.x = x - 0.3;
            node.text.position.y = y - 0.3;
        });

        this.edges.forEach(edge => {
            edge.refresh();
        });
    }

    private computePositions() {

        const graph = new Graphology();

        this.nodes.forEach(node => {
            const x = Math.random() * 1; // Set initial x position
            const y = Math.random() * 1; // Set initial y position
            graph.addNode(node.id, { x, y });
        });

        this.edges.forEach(edge => {
            graph.addEdge(edge.source.id, edge.target.id);
        });

        const positions = forceAtlas2(graph, {
            iterations: 50,
            settings: {
                gravity: 10
            }
        });

        return positions;
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
