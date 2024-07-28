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