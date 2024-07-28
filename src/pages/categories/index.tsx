import * as React from 'react';
import Footer from '../../commons/Footer';
import { ThemeProvider } from '@mui/material';
import theme from '../../commons/theme';
import Logo from '../../commons/Logo';
import { getNoOverlapCircles } from './layouts/no-overlap-layout';
import { categories, connections } from './layouts/category';
import { CategoryCircle, Circle, drawArrow, drawCircle, isInsideCircle } from './layouts/circle';

const scaleCanvas = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
    const rect = canvas.getBoundingClientRect();

    const innerWidth = Math.min(document.documentElement.clientWidth, window.innerWidth);// window.innerWidth;
    const innerHeight = Math.min(document.documentElement.clientHeight, window.innerWidth) - rect.y;

    const scale = 1 //window.devicePixelRatio || 1;

    const width = innerWidth * scale;
    const height = innerHeight * scale;

    canvas.width = width;
    canvas.height = height;

    context.scale(scale, scale);

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
}

const drawCanvas = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, circles: CategoryCircle[]) => {
    scaleCanvas(canvas, context);
    context.clearRect(0, 0, canvas.width, canvas.height);

    circles.forEach(({ x, y, radius }, index) => {
        drawCircle(context, { x, y, radius, }, categories[index]);
    });

    const map = new Map(circles.map(circle => [circle.categoryType, circle]));
    connections.forEach(connection => {
        const from = map.get(connection[0]);
        const to = map.get(connection[1]);
        if (from && to) {
            drawArrow(context, from, to);
        }
    });
}

/**
 * To differentiate between a drag and a click, you can use a combination of mouse events and a time threshold. 
 * The idea is to record the mouse down and mouse up events and calculate the time difference and distance moved. 
 * If the time is short and the distance is small, it is considered a click. Otherwise, it is considered a drag.
*/
const Body = () => {
    const radius: number = 80;

    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    let circles: CategoryCircle[] = [];
    let dragTarget: Circle | null = null;
    let isDragging = false;
    let dragStartTime: number | null = null;
    let dragStartX: number | null = null;
    let dragStartY: number | null = null;
    const clickThresholdTime = 200; // milliseconds
    const clickThresholdDistance = 5; // pixels

    function handleMouseDown(e: MouseEvent, circles: Circle[]): void {
        const { offsetX, offsetY } = e;
        dragStartX = offsetX;
        dragStartY = offsetY;
        dragStartTime = new Date().getTime();
        isDragging = false;
        for (const circle of circles) {
            if (isInsideCircle(offsetX, offsetY, circle)) {
                dragTarget = circle;
                break;
            }
        }
    }

    function draw(): void {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (canvas && context) {
            drawCanvas(canvas, context, circles);
        }
    }

    function handleMouseMove(e: MouseEvent): void {
        if (!dragTarget) {
            return;
        }
        const { offsetX, offsetY } = e;

        const dx = Math.abs(offsetX - (dragStartX ?? 0));
        const dy = Math.abs(offsetY - (dragStartY ?? 0));

        if (dx > clickThresholdDistance || dy > clickThresholdDistance) {
            isDragging = true;
        }

        if (isDragging) {
            dragTarget.x = offsetX;
            dragTarget.y = offsetY;
            draw();
        }
    }

    function handleMouseUp(e: MouseEvent, circles: Circle[]): void {
        const { offsetX, offsetY } = e;
        const endTime = new Date().getTime();

        if (dragTarget && !isDragging && endTime - (dragStartTime ?? 0) < clickThresholdTime) {
            for (const circle of circles) {
                if (isInsideCircle(offsetX, offsetY, circle)) {


                    console.log("click")
                    break;
                }
            }
        }

        dragTarget = null;
        isDragging = false;
        dragStartTime = null;
        dragStartX = null;
        dragStartY = null;
    }

    const refreshCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const radiusList = categories.map(_ => radius);
            circles = getNoOverlapCircles(canvas.width, canvas.height, radiusList).map((circle, i) => {
                return { ...circle, ...categories[i] }
            });
        }
        draw();
    };

    React.useEffect(() => {
        const handleResize = () => { refreshCanvas() };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize)
        };
    }, []);

    React.useEffect(() => {
        refreshCanvas();
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.addEventListener('mousedown', (e) => handleMouseDown(e, circles));
            canvas.addEventListener('mousemove', (e) => handleMouseMove(e));
            canvas.addEventListener('mouseup', (e) => handleMouseUp(e, circles));
        }
        return () => {
            if (canvas) {
                canvas.removeEventListener('mousedown', (e) => handleMouseDown(e, circles));
                canvas.removeEventListener('mousemove', (e) => handleMouseMove(e));
                canvas.removeEventListener('mouseup', (e) => handleMouseUp(e, circles));
            }
        };
    }, [canvasRef]);

    return (
        <>
            <canvas
                ref={canvasRef}
                style={{
                    backgroundColor: "#f8f9fa",
                    borderTop: "2px solid #e2e2e2",
                }}
            />
        </>
    )
}

const Main = () => {
    return (
        <ThemeProvider theme={theme}>
            <div style={{ marginLeft: 40, marginRight: 40 }}>
                <Logo />
            </div>
            <Body />
            <div style={{ marginLeft: 40, marginRight: 40 }}>
                <Footer />
            </div>
        </ThemeProvider>
    );
};

export default Main;
