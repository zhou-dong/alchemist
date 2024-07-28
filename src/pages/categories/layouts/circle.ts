import { Category } from "./category";

export interface Circle {
    x: number;
    y: number;
    radius: number;
}

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

export const drawCircle = (context: CanvasRenderingContext2D, circle: Circle, category: Category) => {

    const { x, y, radius } = circle;

    const { emoji, categoryType } = category;
    const backgroundColor = "#fff";

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

    context.font = '300 20px "Roboto"';
    context.fillStyle = "#000";
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    context.fillText(emoji, x, y - radius / 4);
    context.fillText(categoryType, x, y + radius / 5); // TODO
}

export function drawArrow(ctx: CanvasRenderingContext2D, circle1: Circle, circle2: Circle): void {
    const { x: x1, y: y1, radius: r1 } = circle1;
    const { x: x2, y: y2, radius: r2 } = circle2;
    const headlen = 10; // length of head in pixels
    const dx = x2 - x1;
    const dy = y2 - y1;
    const angle = Math.atan2(dy, dx);

    // Starting point adjusted for circle radius
    const startX = x1 + r1 * Math.cos(angle);
    const startY = y1 + r1 * Math.sin(angle);

    // Ending point adjusted for circle radius
    const endX = x2 - r2 * Math.cos(angle);
    const endY = y2 - r2 * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // Draw the arrow head
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(endX - headlen * Math.cos(angle - Math.PI / 6), endY - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(endX, endY);
    ctx.lineTo(endX - headlen * Math.cos(angle + Math.PI / 6), endY - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
}
