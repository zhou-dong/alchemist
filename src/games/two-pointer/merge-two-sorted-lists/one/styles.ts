import { Scene } from "three";
import { LinkedListNode, SimpleLinkedListNode } from "../../../../data-structures/list/doubly-linked-list/node.three";

export const buildDummyNode = (
    scene: Scene,
    text: string,
    x: number,
    y: number,
    z: number
): LinkedListNode<number> => {
    const node = new SimpleLinkedListNode<number>(
        -1,
        text,
        scene,
        "lightgray",
        2,
        2,
        2,
        0.1,
        true,
        "gold",
        0.4,
        1
    );

    node.nodeSkin.x = x;
    node.nodeSkin.y = y;
    node.nodeSkin.z = z;

    node.nodeText.x = x - 2 * x;
    node.nodeText.y = y;
    node.nodeText.z = z;

    node.show();

    return node;
}
