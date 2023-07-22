import Graphology from "graphology";
import forceAtlas2 from 'graphology-layout-forceatlas2';
import { circular } from 'graphology-layout';

export function forceAtlas2Layout(graph: Graphology) {

    graph.forEachNode((_, attributes) => {
        attributes.x = Math.random() * 10; // Set initial x position
        attributes.y = Math.random() * 10; // Set initial y position
    });

    const sensibleSettings = forceAtlas2.inferSettings(graph);

    return forceAtlas2(graph, {
        iterations: 50,
        settings: sensibleSettings
    });
}

export function circularLayout(graph: Graphology, scale: number) {
    return circular(graph, { scale });
} 
