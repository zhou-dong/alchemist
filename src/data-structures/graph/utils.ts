import Graphology from "graphology";
import forceAtlas2 from 'graphology-layout-forceatlas2';
import { Graph } from ".";

export function buildGraphology<T>(graph: Graph<T>): Graphology {

    const graphology = new Graphology();

    graph.nodes.forEach(node => {
        graphology.addNode(node.id);
    });

    graph.edges.forEach(edge => {
        if (!graphology.hasEdge(edge.source.id, edge.target.id)) {
            graphology.addEdge(edge.source.id, edge.target.id);
        }
    });

    return graphology;
}

export function forceAtlas2Layout<T>(graph: Graph<T>) {

    const graphology = buildGraphology(graph);

    graphology.forEachNode((_, attributes) => {
        attributes.x = Math.random() * 10; // Set initial x position
        attributes.y = Math.random() * 10; // Set initial y position
    });

    const sensibleSettings = forceAtlas2.inferSettings(graphology);

    return forceAtlas2(graphology, {
        iterations: 50,
        settings: sensibleSettings
    });
}
