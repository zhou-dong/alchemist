import { ContentCircle, drawArrow, drawCircle } from "../../../commons/circle";

interface Node extends ContentCircle<string> { }

const base: Node = {
    x: 0,
    y: 0,
    radius: 0,
    value: "",
    text: "root",
    emoji: "",
    selected: false,
}

const buildNode = (): Node => ({ ...base });

const tree = [
    buildNode(),
    buildNode(),
    buildNode(),
    buildNode(),
    buildNode(),
];

tree.forEach((node, index) => {
    node.emoji = index + 1 + "";

    if (index % 2) {
        node.selected = true;
    }
});

export const setBasicTreePosition = (width: number, height: number) => {
    const radius = height / 16;
    const adjustX: number = width / 2;
    const adjustY: number = 5 * radius;

    tree.forEach((node, index) => {
        // reset to 0 to make sure will not over calculation.
        if (index === 0) {
            node.x = 0;
            node.y = 0;
        }

        node.radius = radius;
        const left = tree[2 * index + 1];
        const right = tree[2 * index + 2];

        if (left) {
            left.x = node.x - 2 * radius;
            left.y = node.y + 3 * radius;
        }

        if (right) {
            right.x = node.x + 2 * radius;
            right.y = node.y + 3 * radius;
        }
    });

    tree.forEach(node => {
        node.x += adjustX;
        node.y += adjustY;
    });
}

export const drawTreeBasics = (context: CanvasRenderingContext2D) => {

    tree.forEach(node => {
        drawCircle(context, node);
    });

    tree.forEach((node, index) => {
        const left = tree[2 * index + 1];
        const right = tree[2 * index + 2];
        if (left) {
            drawArrow(context, node, left);
        }
        if (right) {
            drawArrow(context, node, right);
        }
    });
}
