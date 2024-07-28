import Graphology from "graphology";
import forceAtlas2 from 'graphology-layout-forceatlas2';
import circular from 'graphology-layout/circular';
import random from 'graphology-layout/random';
import { CategoryType } from "./category";

export function getCircleLayout(categories: string[]) {

    const graphology = new Graphology();

    categories.forEach(category => {
        graphology.addNode(category);
    });

    return circular(graphology, { scale: 350 });
};


export function getRandomLayout(categories: string[]) {

    const graphology = new Graphology();

    categories.forEach(category => {
        graphology.addNode(category);
    });

    return random(graphology, { scale: 600 });
};


export function getForceAtlas2Layout(nodes: CategoryType[], edges: CategoryType[][]) {

    const graphology = new Graphology();

    nodes.forEach(node => {
        graphology.addNode(node);
    });

    edges.forEach(edge => {
        const [a, b] = edge;
        if (!graphology.hasEdge(a, b)) {
            graphology.addEdge(a, b);
        }
    })

    graphology.forEachNode((_, attributes) => {
        attributes.x = Math.random() * 10; // Set initial x position
        attributes.y = Math.random() * 10; // Set initial y position
    });

    const sensibleSettings = forceAtlas2.inferSettings(graphology);

    return forceAtlas2(graphology, {
        iterations: 150,
        settings: {
            ...sensibleSettings,
            gravity: 0.01,
            scalingRatio: 400,
        }
    });
};