import Graphology from "graphology";
import circular from 'graphology-layout/circular';

import { LinkedListNode } from '../../../data-structures/list/linked-list/node.three';
import { duration } from "./styles";
import Position from "../../../data-structures/_commons/params/position.interface";

class GraphNode {
    id: number;
    skinPosition: Position;
    listNode: LinkedListNode<number>;
    nextListNode?: LinkedListNode<number>;
    next?: GraphNode;

    constructor(id: number, listNode: LinkedListNode<number>) {
        this.id = id;
        this.skinPosition = { x: 0, y: 0, z: 0 };
        this.listNode = listNode;
        this.nextListNode = listNode.next;
    }
}

const buildIdMap = (head: LinkedListNode<number>): Map<LinkedListNode<number>, number> => {
    const map: Map<LinkedListNode<number>, number> = new Map();

    let current: LinkedListNode<number> | undefined = head;
    for (let i = 0; current && !map.has(current); i++) {
        map.set(current, i);
        current = current.next;
    }

    return map;
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

const buildGraphology = (map: Map<LinkedListNode<number>, number>) => {
    const graphology = new Graphology();

    const nodes: LinkedListNode<number>[] = Array.from(map.keys());

    nodes.forEach(node => {
        const id = map.get(node);
        if (id) {
            graphology.addNode(id);
        }
    });

    nodes.forEach(node => {
        const nodeId: number | undefined = map.get(node);
        const nextId: number | undefined = node.next && map.get(node.next);
        if (nodeId && nextId) {
            if (!graphology.hasEdge(nodeId, nextId)) {
                graphology.addEdge(nodeId, nextId);
            }
        }
    });

    return graphology;
}

const calDistance = (p1: Position, p2: Position): Position => {
    return {
        x: p1.x - p2.x,
        y: p1.y - p2.y,
        z: p1.z - p2.z
    }
}

const calPositions = (cycleBeginNode: LinkedListNode<number>): GraphNode[] => {

    const nodes: GraphNode[] = buildGraphNodes(cycleBeginNode);
    const graphology: Graphology = buildGraph(nodes);
    const positions = circular(graphology, { scale: 4 });

    // set positions with center (0,0)
    nodes.forEach(node => {
        const { id, listNode } = node;
        const { x, y } = positions[id];
        const skinX = x * -1;
        node.skinPosition = { x: skinX, y, z: listNode.nodeSkin.z };
    });

    // move nodes back
    const distance = calDistance(cycleBeginNode, nodes[0].skinPosition);
    nodes.forEach(node => {
        const { x, y, z } = node.skinPosition;
        node.skinPosition = { x: x + distance.x, y: y + distance.y, z: z + distance.z };
    });

    return nodes;
}

const moveNodes = async (graphNodes: GraphNode[]): Promise<void> => {

    const asyncs = graphNodes.map(node => {
        const { listNode, skinPosition } = node;
        return listNode.move(skinPosition, duration, () => listNode.linkToNext?.refresh());
    })

    return Promise.all(asyncs).then(() => { });
}


export const updatePositions = async (cycleBeginNode: LinkedListNode<number>): Promise<void> => {
    const idMap = buildIdMap(cycleBeginNode);

    const graphNodes = calPositions(cycleBeginNode);
    return moveNodes(graphNodes);
}
