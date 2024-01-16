import * as THREE from "three";
import { SimpleLinkedListNodeText, SimpleLinkedListSphereNodeSkin } from "../../../data-structures/list/list-node-base";
import { LinkedListNode } from "../../../data-structures/list/linked-list/node.three";
import Position from "../../../data-structures/_commons/params/position.interface";
import { LinkedList } from "../../../data-structures/list/linked-list/list.three";

export const linkColor = "gold";
export const skinDefaultColor = "yellow";
export const linkLength = 4;
export const duration = 1;
export const radius = 1;
export const skinEnabledColor = "lightblue";
export const x = -8;
export const y = 7;

const textColor = "green";

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

export const adjustX = (value: string, x: number): number => {
    const adjusted = ((value).length === 1) ? -0.3 : -0.5;
    return x + adjusted;
}

export const adjustY = (y: number): number => {
    return y - 0.2;
}

const buildHead = (scene: THREE.Scene, i: number, x: number, y: number, z: number): LinkedListNode<number> => {
    const textX = adjustX(i + "", x);
    const textY = adjustY(y);
    return buildLinkedListNode(scene, i, i + "", { x, y, z }, { x: textX, y: textY, z })
}

const buildNode = (scene: THREE.Scene, i: number): LinkedListNode<number> => {
    const x = 0;
    const y = 0;
    const z = 0;
    const textX = adjustX(i + "", 0);
    const textY = adjustY(0);
    return buildLinkedListNode(scene, i, i + "", { x, y, z }, { x: textX, y: textY, z })
}

export const buildLinkedListNode = (
    scene: THREE.Scene,
    value: number,
    text: string,
    skinPosition: Position,
    textPosition: Position
) => {

    const nodeSkin = buildSkin(scene, skinPosition);
    const nodeText = buildText(scene, text, textPosition);

    return new LinkedListNode<number>(value, nodeSkin, nodeText);
}

export const buildList = async (
    scene: THREE.Scene,
    array: number[],
    x: number,
    y: number
): Promise<LinkedListNode<number>> => {
    const list = new LinkedList<number>(scene, duration, linkColor, linkLength);
    const adjustPosition = (position: Position) => position;
    list.adjustSource = adjustPosition;
    list.adjustTarget = adjustPosition;

    const head = buildHead(scene, array[0], x, y, 0);
    await list.push(head);
    for (let i = 1; i < array.length; i++) {
        await list.push(buildNode(scene, array[i]));
    }
    return head;
}

export const findCycleBeginNode = (head: LinkedListNode<number>, pos: number): LinkedListNode<number> | undefined => {
    if (pos < 0) {
        return undefined;
    }
    let current: LinkedListNode<number> | undefined = head;
    for (let i = 0; i < pos; i++) {
        if (!current) {
            return undefined;
        }
        current = current.next;
    }
    return current;
}

export const findTail = (head: LinkedListNode<number>): LinkedListNode<number> => {
    let current: LinkedListNode<number> = head;
    while (current.next) {
        current = current.next;
    }
    return current;
}

export const center = (head: LinkedListNode<number> | undefined): Promise<any> => {
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;

    let current: LinkedListNode<number> | undefined = head;
    const nodes: LinkedListNode<number>[] = [];

    while (current) {
        nodes.push(current);
        const { x } = current;
        min = Math.min(min, x);
        max = Math.max(max, x);
        current = current.next;
    }

    const mid = (min + max) / 2;
    const distance = 0 - mid;

    const promises = nodes.map(node => {
        const { x, y, z } = node;
        return node.move({ x: x + distance, y, z }, duration, () => node.linkToNext?.refresh());
    })

    return Promise.all(promises);
}
