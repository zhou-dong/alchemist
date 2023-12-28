import * as THREE from "three";
import { SimpleLinkedListNodeText, SimpleLinkedListSphereNodeSkin } from "../../../data-structures/list/list-node-base";
import { LinkedListNode } from "../../../data-structures/list/linked-list/node.three";
import Position from "../../../data-structures/_commons/params/position.interface";
import { LinkedList } from "../../../data-structures/list/linked-list/list.three";

export const linkColor = "gold";
export const skinDefaultColor = "yellow";
export const skinPreOrderColor = "orange";
export const skinPostOrderColor = "lightgreen";
const linkLength = 4;
const duration = 1;

const textColor = "green";

const buildSkin = (scene: THREE.Scene, position: Position) => {
    const radius = 1;

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

const buildHead = (scene: THREE.Scene, i: number, y: number): LinkedListNode<number> => {
    const textX = ((i + "").length === 1) ? -0.3 : -0.5;
    return buildLinkedListNode(scene, i, i + "", { x: -8, y, z: 0 }, { x: -8 + textX, y: y - 0.2, z: 0 })
}

const buildNode = (scene: THREE.Scene, i: number): LinkedListNode<number> => {
    const textX = ((i + "").length === 1) ? -0.3 : -0.5;
    return buildLinkedListNode(scene, i, i + "", { x: 0, y: 0, z: 0 }, { x: textX, y: -0.2, z: 0 })
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
    y: number
): Promise<LinkedListNode<number>> => {
    const list = new LinkedList<number>(scene, duration, linkColor, linkLength);
    const head = buildHead(scene, array[0], y);
    await list.push(head);
    for (let i = 1; i < array.length; i++) {
        await list.push(buildNode(scene, array[i]));
    }
    return head;
}
