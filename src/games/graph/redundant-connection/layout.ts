import { buildGraphology } from '../../../data-structures/graph/utils';
import { Graph } from "../../../data-structures/graph";
import forceLayout from 'graphology-layout-force';

export const layoutCalculator = <T>(graph: Graph<T>) => {
    const graphology = buildGraphology(graph);

    graphology.forEachNode((_, attributes) => {
        attributes.x = Math.random() * 15 - 4; // Set initial x position
        attributes.y = Math.random() * 10 - 2; // Set initial y position
    });

    return forceLayout(graphology, { maxIterations: 50 });
}
