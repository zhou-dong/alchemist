import Graphology from "graphology";
import circular from 'graphology-layout/circular';
import { LinkedListNode } from '../../../data-structures/list/linked-list/node.three';
import { duration, linkLength, x, y } from "./styles";
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
        const { y } = node.skinPosition;
        node.skinPosition.y = y + distance.y;
    });

    return nodes;
}

const moveNodes = async (graphNodes: GraphNode[]): Promise<any> => {

    const asyncs = graphNodes.map(node => {
        const { listNode, skinPosition } = node;
        return listNode.move(skinPosition, duration, () => listNode.linkToNext?.refresh());
    })

    return Promise.all(asyncs);
}

const getNodes = (head: LinkedListNode<number>): LinkedListNode<number>[] => {
    const result: LinkedListNode<number>[] = [];

    const set: Set<LinkedListNode<number>> = new Set();
    let current: LinkedListNode<number> | undefined = head;
    while (current && !set.has(current)) {
        set.add(current);
        result.push(current);
        current = current.next;
    }

    return result;
}

export const updatePositions = async (cycleBeginNode: LinkedListNode<number>): Promise<any> => {
    const graphNodes = calPositions(cycleBeginNode);
    return moveNodes(graphNodes);
}

export const circleToLine = async (head: LinkedListNode<number>): Promise<any> => {
    const nodes: LinkedListNode<number>[] = [];
    let current: LinkedListNode<number> | undefined = head;
    while (current) {
        nodes.push(current);
        current = current.next;
    }

    const asyncs = nodes.map((node, i) => {
        return node.move({ x: x + i * linkLength, y, z: head.z }, duration, () => node.linkToNext?.refresh());
    })

    return Promise.all(asyncs);
}
