import { green } from '@mui/material/colors';
import { grey } from '@mui/material/colors';

import { Category } from "./category";

export interface Circle {
    x: number;
    y: number;
    radius: number;
}

export interface CategoryCircle extends Category, Circle { };

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

export const drawCircle = (context: CanvasRenderingContext2D, categoryCircle: CategoryCircle) => {

    const { x, y, radius, emoji, categoryType, selected } = categoryCircle;

    const backgroundColor = selected ? green[300] : "#fff";
    const textColor = selected ? "#000" : "#000";
    const fontWeight = selected ? 200 : 200;

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

    context.font = '400 20px "Roboto"';
    context.fillStyle = textColor;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(emoji, x, y - radius / 4);

    context.font = `${fontWeight} 16px "Roboto"`;
    context.fillText(categoryType, x, y + radius / 5); // TODO
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
