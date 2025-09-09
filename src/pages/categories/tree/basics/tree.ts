import { ContentCircle, drawArrow, drawCircle } from "../../../commons/circle";
import { resetCanvas } from "../../../commons/canvas";
import { footerHeight } from "../../../commons/Footer";
import React from "react";

interface Node extends ContentCircle<string> {
    color?: 'correct' | 'incorrect' | 'default';
}

const base: Node = {
    x: 0,
    y: 0,
    radius: 0,
    value: "",
    text: "",
    emoji: "",
    selected: false,
}

const buildNode = (text: number, value: string): Node => ({ ...base, text: text + "", value });

export const treeNodes = [
    buildNode(1, "root"),
    buildNode(2, "node"),
    buildNode(3, "node"),
    buildNode(4, "leaf"),
    buildNode(5, "leaf"),
    null,
    buildNode(6, "leaf"),
];

treeNodes.forEach((node, index) => {
    if (!node) return;
    // node.emoji = index + 1 + "";
    // node.text = index + "";
    // node.selected = true;
    // if (index % 2) {
    //     node.selected = true;
    // }
});

export const setBasicTreePosition = (width: number, height: number) => {
    const r1 = height / 16;
    const r2 = width / 16;
    const radius = Math.min(r1, r2);

    const adjustX: number = width / 2;
    const adjustY: number = height / 2 - 4 * radius;

    treeNodes.forEach((node, index) => {
        if (!node) return;
        // reset to 0 to make sure will not over calculation.
        if (index === 0) {
            node.x = 0;
            node.y = 0;
        }

        node.radius = radius;
        const left = treeNodes[2 * index + 1];
        const right = treeNodes[2 * index + 2];

        if (left) {
            left.x = node.x - 2 * radius;
            left.y = node.y + 3 * radius;
        }

        if (right) {
            right.x = node.x + 2 * radius;
            right.y = node.y + 3 * radius;
        }
    });

    treeNodes.forEach(node => {
        if (!node) return;
        node.x += adjustX;
        node.y += adjustY;
    });
}

export const drawTreeBasics = (context: CanvasRenderingContext2D) => {
    treeNodes.forEach(node => {
        if (!node) return;
        drawCircle(context, node);
    });

    treeNodes.forEach((node, index) => {
        if (!node) return;

        const left = treeNodes[2 * index + 1];
        const right = treeNodes[2 * index + 2];

        if (left) {
            drawArrow(context, node, left);
        }
        if (right) {
            drawArrow(context, node, right);
        }
    });
}

export const refreshCanvas = (
    containerRef: React.RefObject<HTMLDivElement>,
    canvasRef: React.RefObject<HTMLCanvasElement>,
): void => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!container || !canvas || !context) return;

    const { width, top } = container.getBoundingClientRect();
    const height = window.innerHeight - top - footerHeight;

    setBasicTreePosition(width, height);
    resetCanvas(canvas, context, width, height);
    drawTreeBasics(context);
}
