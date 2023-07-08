import Graphology from "graphology";
import forceAtlas2 from 'graphology-layout-forceatlas2';
import { GraphNode } from "./node.interface";
import { GraphEdge } from "./edge.interface";

export class Graph<T> {

    nodes: GraphNode<T>[];
    edges: GraphEdge<T>[];

    constructor(nodes: GraphNode<T>[], edges: GraphEdge<T>[]) {
        this.nodes = nodes;
        this.edges = edges;
        this.setPositions();
    }

    private setPositions() {
        const positions = this.computePositions();

        this.nodes.forEach(node => {
            const { x, y } = positions[node.id];
            node.position.x = x;
            node.position.y = y;
        });

        this.edges.forEach(edge => {
            edge.refresh();
        });
    }

    private computePositions() {

        const graph = new Graphology();

        this.nodes.forEach(node => {
            const x = Math.random() * 100; // Set initial x position
            const y = Math.random() * 100; // Set initial y position
            graph.addNode(node.id, { x, y });
        });

        this.edges.forEach(edge => {
            graph.addEdge(edge.source.id, edge.target.id);
        })

        const positions = forceAtlas2(graph, {
            iterations: 50,
            settings: {
                gravity: 10
            }
        });

        return positions;
    }

}
