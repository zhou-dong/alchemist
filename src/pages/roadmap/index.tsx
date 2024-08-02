import * as React from 'react';
import Footer from '../../commons/Footer';
import { Grid, Paper, styled, ThemeProvider } from '@mui/material';
import theme from '../../commons/theme';
import Logo from '../../commons/Logo';
import { connections } from './layouts/category';
import { CategoryCircle, Circle, drawArrow, drawCircle, isInsideCircle } from './layouts/circle';
import { getFixedTreeLayout } from './layouts/fixed-position-layout';
import Divider from '@mui/material/Divider';
import Algorithms from "../home/List";
import { useGames } from '../../games/commons/GamesContext';

const canvasMaxHeight = "900px";

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
    const { categories, setCategories } = useGames();

    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    let containerWidth = 0;
    let containerHeight = 0;

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

    function handleMouseDown(e: MouseEvent): void {
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
            drawCanvas(containerWidth, containerHeight);
        }
    }

    function handleMouseUp(e: MouseEvent): void {
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
            canvas.addEventListener('mousedown', (e) => handleMouseDown(e));
            canvas.addEventListener('mousemove', (e) => handleMouseMove(e));
            canvas.addEventListener('mouseup', (e) => handleMouseUp(e));
        }
        return () => {
            if (canvas) {
                canvas.removeEventListener('mousedown', (e) => handleMouseDown(e));
                canvas.removeEventListener('mousemove', (e) => handleMouseMove(e));
                canvas.removeEventListener('mouseup', (e) => handleMouseUp(e));
            }
        };
    }, [canvasRef]);

    React.useEffect(() => {
        const containerElement = containerRef.current;
        if (!containerElement) return;

        const refreshCanvas = (width: number, height: number) => {
            circles = getFixedTreeLayout(width, height);
            containerWidth = width;
            containerHeight = height;
            drawCanvas(width, height);
        };

        if (containerRef.current) {
            const { width, height } = containerRef.current.getBoundingClientRect();
            refreshCanvas(width, height);
        }

        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
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
                height: canvasMaxHeight,
                maxWidth: '1800px',
                maxHeight: canvasMaxHeight,
            }}
        >
            <canvas
                ref={canvasRef}
            />
        </div>
    );
}

const AlgorithmsContainer = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: theme.spacing(2),
    height: '100%',
    overflow: 'auto',
}));

const Main = () => {

    const xs = 12;
    const sm = 6;
    const md = 4;
    const lg = 6;
    const xl = 3;

    return (
        <ThemeProvider theme={theme}>
            <div style={{
                marginLeft: 40,
                marginRight: 40,
            }}>
                <Logo />
            </div>
            <Divider />
            <Grid container spacing={1} sx={{ padding: 2 }}>
                <Grid item xs={12} md={12} lg={8} xl={7} style={{}}>
                    <Roadmap />
                </Grid>
                <Grid item xs={12} md={12} lg={4} xl={5} style={{}}>
                    <Paper
                        elevation={3}
                        sx={{
                            height: canvasMaxHeight
                        }}>
                        <AlgorithmsContainer>
                            <Algorithms xs={xs} sm={sm} md={md} lg={lg} xl={xl} />
                        </AlgorithmsContainer>
                    </Paper>
                </Grid>
            </Grid>
            <Footer />
        </ThemeProvider>
    );
};

export default Main;
