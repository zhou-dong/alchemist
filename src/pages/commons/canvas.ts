export const clearCanvas = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

export const scaleCanvas = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, width: number, height: number) => {
    const scale = window.devicePixelRatio || 1;

    canvas.width = width * scale;
    canvas.height = height * scale;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    context.scale(scale, scale);
}
