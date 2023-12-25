import * as THREE from "three";
import { SimpleLinkedListNodeSkin, SimpleLinkedListNodeText } from "../../../data-structures/list/list-node-base";
import { LinkedListNode } from "../../../data-structures/list/linked-list/node.three";
import Position from "../../../data-structures/_commons/params/position.interface";

export const linkColor = "gold";

const buildSkin = (scene: THREE.Scene, position: Position) => {
    const width = 1.5;
    const height = 1.5;
    const depth = 1.5;

    const color = "lightblue";
    const opacity = 0.4;
    const transparent = true;

    const skin = new SimpleLinkedListNodeSkin(scene, color, width, height, depth, opacity, transparent);

    const { x, y, z } = position;
    skin.x = x;
    skin.y = y;
    skin.z = z;

    return skin;
}

const buildText = (scene: THREE.Scene, text: string, position: Position) => {
    const color = "gold";
    const fontSize = 0.6;
    const fontHeight = 0.1;

    const skinText = new SimpleLinkedListNodeText(text, scene, color, fontSize, fontHeight);

    const { x, y, z } = position;
    skinText.x = x;
    skinText.y = y;
    skinText.z = z;

    return skinText;
}

export const buildLinkedListNode = (
    scene: THREE.Scene,
    value: number,
    skinPosition: Position,
    textPosition: Position
) => {

    const skin = buildSkin(scene, skinPosition);
    const text = buildText(scene, value + "", textPosition);

    return new LinkedListNode<number>(value, skin, text);
}
