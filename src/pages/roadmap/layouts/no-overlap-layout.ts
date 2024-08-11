import { Circle, isOverlap } from "./circle";

function isOverlapWithOthers(circle: Circle, others: Circle[]): boolean {
    for (let other of others) {
        if (isOverlap(circle, other)) {
            return true;
        }
    }
    return false;
}

export function getNoOverlapCircles(
    canvasWidth: number,
    canvasHeight: number,
    radiusList: number[],
): Circle[] {
    let attempts = 0;
    const maxAttempts = 1000; // Limit attempts to avoid infinite loop
    const circles: Circle[] = [];
    let index = 0;
    while (circles.length < radiusList.length && attempts < maxAttempts) {
        const radius = radiusList[index];
        const x = Math.random() * (canvasWidth - 2 * radius) + radius;
        const y = Math.random() * (canvasHeight - 2 * radius) + radius;
        if (!isOverlapWithOthers({ x, y, radius }, circles)) {
            circles.push({ x, y, radius });
            index++;
        }
        attempts++;
    }

    // If maxAttempts exceeded, generate remaining circles without overlap check
    while (circles.length < radiusList.length) {
        const radius = radiusList[index];
        const x = Math.random() * (canvasWidth - 2 * radius) + radius;
        const y = Math.random() * (canvasHeight - 2 * radius) + radius;
        circles.push({ x, y, radius, });
        index++;
    }

    return circles;
}
