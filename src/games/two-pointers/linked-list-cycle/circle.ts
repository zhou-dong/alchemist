import Graphology from "graphology";
import circular from 'graphology-layout/circular';

import { LinkedListNode } from '../../../data-structures/list/linked-list/node.three';
import { adjustX, adjustY } from "./styles";

class GraphNode {
    id: number;
    listNode: LinkedListNode<number>;
    nextListNode?: LinkedListNode<number>;
    next?: GraphNode;

    constructor(id: number, listNode: LinkedListNode<number>) {
        this.id = id;
        this.listNode = listNode;
        this.nextListNode = listNode.next;
    }
}

const buildGraphNodes = (head: LinkedListNode<number>): GraphNode[] => {
    const map: Map<LinkedListNode<number>, GraphNode> = new Map();

    const nodes: GraphNode[] = [];
    let current: LinkedListNode<number> | undefined = head;
    let i = 0;
    while (current && !map.has(current)) {
        const node = new GraphNode(i, current)
        map.set(current, node);
        nodes.push(node);
        current = current.next;
        i++;
    }

    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const next: GraphNode | undefined = node.nextListNode && map.get(node.nextListNode);
        node.next = next;
    }

    return nodes;
}

const buildGraph = (nodes: GraphNode[]) => {
    const graphology = new Graphology();

    nodes.forEach(node => {
        graphology.addNode(node.id);
    });

    nodes.forEach(node => {
        const { next, id } = node;
        if (next) {
            if (!graphology.hasEdge(id, next.id)) {
                graphology.addEdge(id, next.id);
            }
        }
    });

    return graphology;
}

export const updatePositions = (head: LinkedListNode<number>) => {
    const nodes: GraphNode[] = buildGraphNodes(head);
    const graphology: Graphology = buildGraph(nodes);
    const positions = circular(graphology, { scale: 4 });

    const headX = positions[nodes[0].id].x;

    nodes.forEach(node => {
        const { id, listNode } = node;
        const { x, y } = positions[id];
        const newX = headX - x - headX;
        listNode.nodeSkin.x = newX;
        listNode.nodeSkin.y = y;

        const textX = adjustX(listNode.nodeText.text, newX);
        const textY = adjustY(y);
        listNode.nodeText.x = textX;
        listNode.nodeText.y = textY;
    });

    nodes.forEach(node => {
        const { listNode } = node;
        listNode.linkToNext?.refresh();
    });
}
