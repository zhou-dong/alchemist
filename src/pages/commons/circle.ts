import { green } from '@mui/material/colors';
import { grey } from '@mui/material/colors';

export interface Circle {
    x: number;
    y: number;
    radius: number;
}

export interface Content<T> {
    value: T
    text: string;
    emoji: string;
    selected: boolean;
}

export interface ContentCircle<T> extends Content<T>, Circle { };

export function isOverlap(a: Circle, b: Circle): boolean {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < (a.radius + b.radius);
}

export function isInsideCircle(x: number, y: number, circle: Circle): boolean {
    const dx = x - circle.x;
    const dy = y - circle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= circle.radius;
}

export const drawCircle = <T,>(context: CanvasRenderingContext2D, categoryCircle: ContentCircle<T>) => {

    const { x, y, radius, emoji, text, selected } = categoryCircle;

    const backgroundColor = selected ? green[300] : "#fff";
    const textColor = selected ? "#fff" : "#000";
    const fontWeight = selected ? 400 : 200;

    context.shadowColor = 'rgba(0, 0, 0, 0.5)';
    context.shadowBlur = 10;
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;

    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = backgroundColor;
    context.fill();

    context.shadowColor = '#fff';
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    context.font = `${fontWeight} 16px "Roboto"`;
    context.fillStyle = textColor;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(emoji, x, y - radius / 4);

    context.font = `${fontWeight} 16px "Roboto"`;
    context.fillText(text, x, y + radius / 5); // TODO
}

export function drawArrow(ctx: CanvasRenderingContext2D, circle1: Circle, circle2: Circle): void {

    const { x: x1, y: y1, radius: r1 } = circle1;
    const { x: x2, y: y2, radius: r2 } = circle2;
    const arrowLength = 10; // Length of the arrow triangle
    const arrowWidth = 10;  // Width of the arrow triangle at the base
    const angle = Math.atan2(y2 - y1, x2 - x1);

    // Starting point adjusted for circle radius
    const startX = x1 + r1 * Math.cos(angle);
    const startY = y1 + r1 * Math.sin(angle);

    // Ending point adjusted for circle radius
    const endX = x2 - r2 * Math.cos(angle);
    const endY = y2 - r2 * Math.sin(angle);

    // Adjusted end point for the arrowhead
    const adjustedEndX = endX - (arrowLength / 2) * Math.cos(angle);
    const adjustedEndY = endY - (arrowLength / 2) * Math.sin(angle);

    // Calculate the points of the triangle
    const arrowTipX = endX;
    const arrowTipY = endY;
    const base1X = adjustedEndX - arrowLength * Math.cos(angle) + arrowWidth * Math.sin(angle) / 2;
    const base1Y = adjustedEndY - arrowLength * Math.sin(angle) - arrowWidth * Math.cos(angle) / 2;
    const base2X = adjustedEndX - arrowLength * Math.cos(angle) - arrowWidth * Math.sin(angle) / 2;
    const base2Y = adjustedEndY - arrowLength * Math.sin(angle) + arrowWidth * Math.cos(angle) / 2;

    // Draw line from start point to the adjusted base of the triangle
    ctx.strokeStyle = grey[300];
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(adjustedEndX, adjustedEndY);
    ctx.stroke();

    // Draw the triangle arrowhead
    ctx.fillStyle = grey[500];
    ctx.beginPath();
    ctx.moveTo(arrowTipX, arrowTipY);
    ctx.lineTo(base1X, base1Y);
    ctx.lineTo(base2X, base2Y);
    ctx.closePath();
    ctx.fill();
}

/**
 * To differentiate between a drag and a click, you can use a combination of mouse events and a time threshold. 
 * The idea is to record the mouse down and mouse up events and calculate the time difference and distance moved. 
 * If the time is short and the distance is small, it is considered a click. Otherwise, it is considered a drag.
*/
export class Dragger<T> {

    dragTarget: Circle | null = null;
    isDragging = false;
    dragStartTime: number | null = null;
    dragStartX: number | null = null;
    dragStartY: number | null = null;
    clickThresholdTime = 200; // milliseconds
    clickThresholdDistance = 5; // pixels
    drawCanvas: (width: number, height: number) => void;
    handleClick: (circle: ContentCircle<T>) => void;

    constructor(
        drawCanvas: (width: number, height: number) => void,
        handleClick: (circle: ContentCircle<T>) => void,
    ) {
        this.drawCanvas = drawCanvas;
        this.handleClick = handleClick;
    }

    public handleMouseDown(e: MouseEvent, circles: ContentCircle<T>[]): void {
        const { offsetX, offsetY } = e;
        this.dragStartX = offsetX;
        this.dragStartY = offsetY;
        this.dragStartTime = new Date().getTime();
        this.isDragging = false;

        for (const circle of circles) {
            if (isInsideCircle(offsetX, offsetY, circle)) {
                this.dragTarget = circle;
                break;
            }
        }
    }

    public handleMouseMove(
        e: MouseEvent,
        containerWidth: number,
        containerHeight: number,
    ): void {
        if (!this.dragTarget) {
            return;
        }
        const { offsetX, offsetY } = e;

        const dx = Math.abs(offsetX - (this.dragStartX ?? 0));
        const dy = Math.abs(offsetY - (this.dragStartY ?? 0));

        if (dx > this.clickThresholdDistance || dy > this.clickThresholdDistance) {
            this.isDragging = true;
        }

        if (this.isDragging) {
            this.dragTarget.x = offsetX;
            this.dragTarget.y = offsetY;
            this.drawCanvas(containerWidth, containerHeight);
        }
    }

    public handleMouseUp(e: MouseEvent, circles: ContentCircle<T>[]): void {
        const { offsetX, offsetY } = e;
        const endTime = new Date().getTime();

        if (this.dragTarget && !this.isDragging && endTime - (this.dragStartTime ?? 0) < this.clickThresholdTime) {
            for (const circle of circles) {
                if (isInsideCircle(offsetX, offsetY, circle)) {
                    this.handleClick(circle);
                    break;
                }
            }
        }

        this.dragTarget = null;
        this.isDragging = false;
        this.dragStartTime = null;
        this.dragStartX = null;
        this.dragStartY = null;
    }

}

export function verticalLinearResize(circles: Circle[], length: number) {
    const radius = length / (2.5 * circles.length + 0.5);

    circles.forEach((circle, index) => {
        circle.radius = radius;
        circle.x = radius * 2;
        circle.y = 1.5 * radius + radius * 2.5 * index;
    });
}

export function horizontalLinearResize(circles: Circle[], length: number) {
    const radius = length / (3 * circles.length + 1);

    circles.forEach((circle, index) => {
        circle.radius = radius;
        circle.y = 1.5 * radius;
        circle.x = 2 * radius + 3 * radius * index;
    });
}

export function doubleLineResize(circles: Circle[], length: number) {
    const n = Math.floor(circles.length / 2) + 1;

    const evenRadius = length / (3 * n - 0.5);
    const oddRadius = length / (3 * n + 1);
    const radius = (circles.length % 2 === 0) ? evenRadius : oddRadius;

    circles.forEach((circle, index) => {
        circle.radius = radius;
        if (index % 2 === 0) {
            circle.x = 2 * radius;
        } else {
            circle.x = 4.5 * radius;
        }
        circle.y = 2 * radius + 1.5 * index * radius;
    });
}
