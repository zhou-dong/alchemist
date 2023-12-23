import { Scene } from "three";
import { DoublyLinkedListNode, SimpleDoublyLinkedListNode } from "../../../../data-structures/list/doubly-linked-list/node.three";

export const buildDummyNode = (
    scene: Scene,
    text: string,
    x: number,
    y: number,
    z: number
): DoublyLinkedListNode<number> => {
    const node = new SimpleDoublyLinkedListNode<number>(
        -1,
        text,
        scene,
        "lightgray",
        2,
        2,
        2,
        0.3,
        true,
        "gold",
        0.6,
        0.5
    );

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
    const node = new SimpleDoublyLinkedListNode<number>(
        value,
        value + "",
        scene,
        "lightgray",
        2,
        2,
        2,
        0.5,
        true,
        "gold",
        0.6,
        0.5
    );

    // node.nodeSkin.x = x;
    // node.nodeSkin.y = y;
    // node.nodeSkin.z = z;

    // node.nodeText.x = x;
    // node.nodeText.y = 2.2 * y;
    // node.nodeText.z = z;

    node.show();

    return node;
}
