import * as React from 'react';
import { Box, ThemeProvider } from '@mui/material';
import theme from '../../../commons/theme';
import Header from '../../commons/Header';
import Footer from '../../commons/Footer';
import { Circle, ContentCircle, drawArrow, drawCircle, isInsideCircle } from '../../commons/circle';
import { steps } from './Steps';
import { resetCanvas } from '../../commons/canvas';

let circles: ContentCircle<string>[] = [];

/**
 * To differentiate between a drag and a click, you can use a combination of mouse events and a time threshold. 
 * The idea is to record the mouse down and mouse up events and calculate the time difference and distance moved. 
 * If the time is short and the distance is small, it is considered a click. Otherwise, it is considered a drag.
*/
const drawCircles = (context: CanvasRenderingContext2D, circles: ContentCircle<string>[]) => {
    let previous: ContentCircle<string> | undefined = undefined;

    steps.forEach(circle => {
        drawCircle(context, circle);
        const current = circle;
        if (previous) {
            drawArrow(context, previous, current);
            previous = current;
        }
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
            drawCircles(context, circles);
        }
    }

    React.useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;

        if (!container || !canvas) {
            return;
        }

        const refreshCanvas = () => {
            const { width, height } = container.getBoundingClientRect();
            drawCanvas(width, height);
        }

        refreshCanvas();

        const resizeObserver = new ResizeObserver(() => {
            refreshCanvas();
        });

        resizeObserver.observe(container);

        return () => {
            resizeObserver.unobserve(canvas);
        };

    }, [canvasRef, containerRef]);

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
                    display: "block",
                    backgroundColor: "lightblue"
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
            <Roadmap />
            <Footer />
        </Box>
    </ ThemeProvider>
);

export default Main;
