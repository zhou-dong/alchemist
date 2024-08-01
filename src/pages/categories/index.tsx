import * as React from 'react';
import Footer from '../../commons/Footer';
import { Grid, ThemeProvider } from '@mui/material';
import theme from '../../commons/theme';
import Logo from '../../commons/Logo';
import { connections } from './layouts/category';
import { CategoryCircle, Circle, drawArrow, drawCircle, isInsideCircle } from './layouts/circle';
import { getFixedTreeLayout } from './layouts/fixed-position-layout';

const scaleCanvas = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, width: number, height: number) => {
    const scale = window.devicePixelRatio || 1;

    canvas.width = width * scale;
    canvas.height = height * scale;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    context.scale(scale, scale);
}

const clearCanvas = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

const drawCircles = (context: CanvasRenderingContext2D, circles: CategoryCircle[]) => {
    const map = new Map(circles.map(circle => [circle.categoryType, circle]));

    circles.forEach(categoryCircle => {
        drawCircle(context, categoryCircle);
    });

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
const Roadmap = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [size, setSize] = React.useState({ width: 0, height: 0 });

    let circles: CategoryCircle[] = [];
    let dragTarget: Circle | null = null;
    let isDragging = false;
    let dragStartTime: number | null = null;
    let dragStartX: number | null = null;
    let dragStartY: number | null = null;
    const clickThresholdTime = 200; // milliseconds
    const clickThresholdDistance = 5; // pixels

    function drawCanvas(width: number, height: number): void {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (canvas && context) {
            scaleCanvas(canvas, context, width, height);
            clearCanvas(canvas, context);
            drawCircles(context, circles);
        }
    }

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
            drawCanvas(size.width, size.height);
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

    React.useEffect(() => {
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

    React.useEffect(() => {
        const containerElement = containerRef.current;
        if (!containerElement) return;

        const refreshCanvas = (width: number, height: number) => {
            circles = getFixedTreeLayout(width, height);
            drawCanvas(width, height);
        };

        if (containerRef.current) {
            const { width, height } = containerRef.current.getBoundingClientRect();
            refreshCanvas(width, height);
        }

        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                setSize({ width, height });
                refreshCanvas(width, height);
            }
        });

        resizeObserver.observe(containerElement);

        return () => {
            resizeObserver.unobserve(containerElement);
        };
    }, [containerRef])

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                height: "750px",
                maxWidth: '1800px',
                maxHeight: '750px',
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    backgroundColor: "#fff",
                }}
            />
        </div>
    );
}

const Main = () => {
    return (
        <ThemeProvider theme={theme}>
            <div style={{ marginLeft: 40, marginRight: 40 }}>
                <Logo />
            </div>
            <Grid container spacing={1} sx={{}}>
                <Grid item xs={12} md={4}>
                    123
                </Grid>
                <Grid item xs={12} md={8} sx={{}} style={{ paddingTop: 0 }}>
                    <Roadmap />
                </Grid>
            </Grid>
            <div style={{ marginLeft: 40, marginRight: 40 }}>
                <Footer />
            </div>
        </ThemeProvider>
    );
};

export default Main;
