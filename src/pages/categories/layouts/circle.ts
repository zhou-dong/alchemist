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
