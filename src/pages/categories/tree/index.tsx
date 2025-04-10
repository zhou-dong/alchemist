import * as React from 'react';
import { Box, ThemeProvider } from '@mui/material';
import theme from '../../../commons/theme';
import Header from '../../commons/Header';
import Footer, { footerHeight } from '../../commons/Footer';
import { ContentCircle, Dragger, drawArrow, drawCircle, horizontalLinearResize } from '../../commons/circle';
import { steps } from './steps';
import { resetCanvas } from '../../commons/canvas';
import { drawTreeBasics, setBasicTreePosition } from "./basics";
import Intro from './intro';

let canvasWidth = 0;
let canvasHeight = 0;

const drawCircles = (context: CanvasRenderingContext2D) => {
    let previous: ContentCircle<string> = steps[0];
    drawCircle(context, previous);

    steps.slice(1).forEach(current => {
        drawCircle(context, current);
        drawArrow(context, previous, current);
        previous = current;
    });
}

const Roadmap = () => {

    const containerRef = React.useRef<HTMLDivElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    function drawCanvas(width: number, height: number): void {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (canvas && context) {
            resetCanvas(canvas, context, width, height);
            drawCircles(context);
            drawTreeBasics(context);
        }
    }

    const handleClick = (circle: ContentCircle<string>) => {
        circle.selected = !circle.selected;

        if (circle.selected) {
            steps.forEach(step => {
                if (step !== circle) {
                    step.selected = false;
                }
            });
        }

        // setCategories(items => updateSegments(items, circle.value, circle.selected));
        drawCanvas(canvasWidth, canvasHeight);
    }

    const draggable = new Dragger<string>(drawCanvas, handleClick);

    React.useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;

        canvas.addEventListener('mousedown', (e) => draggable.handleMouseDown(e, steps));
        canvas.addEventListener('mousemove', (e) => draggable.handleMouseMove(e, canvasWidth, canvasHeight));
        canvas.addEventListener('mouseup', (e) => draggable.handleMouseUp(e, steps));

        return () => {
            canvas.removeEventListener('mousedown', (e) => draggable.handleMouseDown(e, steps));
            canvas.removeEventListener('mousemove', (e) => draggable.handleMouseMove(e, canvasWidth, canvasHeight));
            canvas.removeEventListener('mouseup', (e) => draggable.handleMouseUp(e, steps));
        };
    }, [canvasRef]);

    React.useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;

        if (!container || !canvas) return;

        const refreshCanvas = () => {
            const { width, top } = container.getBoundingClientRect();
            const height = window.innerHeight - top - footerHeight;

            horizontalLinearResize(steps, width);
            setBasicTreePosition(width, height);
            drawCanvas(width, height);

            canvasWidth = width;
            canvasHeight = height;
        }

        refreshCanvas();

        const resizeObserver = new ResizeObserver(() => refreshCanvas());

        resizeObserver.observe(container);

        return () => {
            resizeObserver.unobserve(container);
        };

    }, [containerRef, canvasRef]);

    return (
        <div
            ref={containerRef}
            style={{
                flex: 1
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    display: "block"
                }}
            >
            </canvas>
        </div>
    );
};

const Main = () => (
    <ThemeProvider theme={theme}>
        <Box
            display="flex"
            flexDirection="column"
            minHeight="100vh"
        >
            <Header />
            {/* <Roadmap /> */}
            <Intro />
            <Footer />
        </Box>
    </ ThemeProvider>
);

export default Main;
