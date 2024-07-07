import * as THREE from "three";
import { SimpleLinkedListNodeText, SimpleLinkedListSphereNodeSkin } from "../../../data-structures/list/list-node-base";
import { LinkedListNode } from "../../../data-structures/list/linked-list/node.three";
import Position from "../../../data-structures/_commons/params/position.interface";
import { LinkedList } from "../../../data-structures/list/linked-list/list.three";

export const linkColor = "gold";
export const skinDefaultColor = "yellow";
export const skinPreOrderColor = "orange";
export const skinPostOrderColor = "lightgreen";

export const linkLength = 4;
export const duration = 1;
export const radius = 1;

const textColor = "green";

export class NodePosition {
    node: LinkedListNode<number | string>;
    x: number;

    constructor(node: LinkedListNode<number | string>, x: number) {
        this.node = node;
        this.x = x;
    }
}

const buildSkin = (scene: THREE.Scene, position: Position) => {

    const color = skinDefaultColor;
    const opacity = 0.3;
    const transparent = true;

    const skin = new SimpleLinkedListSphereNodeSkin(scene, color, radius, opacity, transparent);

    const { x, y, z } = position;
    skin.x = x;
    skin.y = y;
    skin.z = z;

    return skin;
}

const buildText = (scene: THREE.Scene, text: string, position: Position) => {
    const color = textColor;
    const fontSize = 0.6;
    const fontHeight = 0.1;

    const skinText = new SimpleLinkedListNodeText(text, scene, color, fontSize, fontHeight);

    const { x, y, z } = position;
    skinText.x = x;
    skinText.y = y;
    skinText.z = z;

    return skinText;
}

const buildHead = (scene: THREE.Scene, num: number, x: number, y: number): LinkedListNode<number> => {
    const textX = ((num + "").length === 1) ? -0.3 : -0.5;
    const textY = y - 0.2;
    return buildLinkedListNode<number>(scene, num, num + "", { x, y, z: 0 }, { x: x + textX, y: textY, z: 0 })
}

const buildNode = (scene: THREE.Scene, i: number): LinkedListNode<number> => {
    const textX = ((i + "").length === 1) ? -0.3 : -0.5;
    const textY = -0.2;
    return buildLinkedListNode<number>(scene, i, i + "", { x: 0, y: 0, z: 0 }, { x: textX, y: textY, z: 0 })
}

export const buildLinkedListNode = <T>(
    scene: THREE.Scene,
    value: T,
    text: string,
    skinPosition: Position,
    textPosition: Position
) => {

    const nodeSkin = buildSkin(scene, skinPosition);
    const nodeText = buildText(scene, text, textPosition);

    return new LinkedListNode<T>(value, nodeSkin, nodeText);
}

export const buildList = async (
    scene: THREE.Scene,
    array: number[],
    x: number,
    y: number
): Promise<LinkedListNode<number | string>> => {
    const list = new LinkedList<number | string>(scene, duration, linkColor, linkLength);
    const head = buildHead(scene, array[0], x, y);
    await list.push(head);
    for (let i = 1; i < array.length; i++) {
        await list.push(buildNode(scene, array[i]));
    }
    return head;
}

export const repositions = (positions: NodePosition[]): Promise<any> => {
    const promises = positions.map(nodePosition => {
        const { node, x } = nodePosition;
        const { y, z } = node;
        return node.move({ x, y, z }, duration, () => node.linkToNext?.refresh());
    })
    return Promise.all(promises);
}

export const getTail = (head: LinkedListNode<number | string>): LinkedListNode<number | string> => {
    let current: LinkedListNode<number | string> = head;
    while (current.next) {
        current = current.next;
    }
    return current;
}
