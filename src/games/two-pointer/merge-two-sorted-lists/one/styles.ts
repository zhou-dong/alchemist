import { Scene } from "three";
import { DoublyLinkedListNode } from "../../../../data-structures/list/doubly-linked-list/node.three";
import { SimpleLinkedListNodeSkin, SimpleLinkedListNodeText } from "../../../../data-structures/list/list-node-base";

export const buildDummyNode = (
    scene: Scene,
    text: string,
    x: number,
    y: number,
    z: number
): DoublyLinkedListNode<number> => {

    const nodeSkin = new SimpleLinkedListNodeSkin(scene, "lightgray", 2, 2, 2, 0.3, true);
    const nodeText = new SimpleLinkedListNodeText(text, scene, "gold", 0.6, 0.5);
    const node = new DoublyLinkedListNode<number>(-1, nodeSkin, nodeText);

    node.nodeSkin.x = x;
    node.nodeSkin.y = y;
    node.nodeSkin.z = z;

    node.nodeText.x = x - 0.7;
    node.nodeText.y = 2.2 * y;
    node.nodeText.z = z;

    node.show();

    return node;
}

export const buildNode = (
    scene: Scene,
    value: number,
) => {

    const nodeSkin = new SimpleLinkedListNodeSkin(scene, "lightgray", 2, 2, 2, 0.3, true);
    const nodeText = new SimpleLinkedListNodeText(value + "", scene, "gold", 0.6, 0.5);
    const node = new DoublyLinkedListNode<number>(value, nodeSkin, nodeText);

    // node.nodeSkin.x = x;
    // node.nodeSkin.y = y;
    // node.nodeSkin.z = z;

    // node.nodeText.x = x;
    // node.nodeText.y = 2.2 * y;
    // node.nodeText.z = z;

    node.show();

    return node;
}
