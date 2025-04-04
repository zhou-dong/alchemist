import * as React from 'react';
import { Box, ThemeProvider } from '@mui/material';
import theme from '../../../commons/theme';
import Header from '../../commons/Header';
import Footer from '../../commons/Footer';
import { ContentCircle, drawArrow, drawCircle, isInsideCircle } from '../../commons/circle';
import { steps } from './steps';
import { resetCanvas } from '../../commons/canvas';

/**
 * To differentiate between a drag and a click, you can use a combination of mouse events and a time threshold. 
 * The idea is to record the mouse down and mouse up events and calculate the time difference and distance moved. 
 * If the time is short and the distance is small, it is considered a click. Otherwise, it is considered a drag.
*/
const drawCircles = (context: CanvasRenderingContext2D) => {
    let previous: ContentCircle<string> = steps[0];
    drawCircle(context, previous);

    steps.slice(1).forEach(current => {
        drawCircle(context, current);
        drawArrow(context, previous, current);
        previous = current;
    });
}

const resizeCircles = (height: number) => {
    const marginTop = 10;
    const radius: number = (height - 2 * marginTop) / steps.length / 2 / 2;
    const x = radius * 2;

    steps.forEach((step, index) => {
        step.radius = radius;
        step.x = x;
        step.y = marginTop + radius + radius * 4 * index;
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
            resizeCircles(height);
            drawCircles(context);
        }
    }

    React.useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;

        if (!container || !canvas) return;

        const refreshCanvas = () => {
            const { width, height } = container.getBoundingClientRect();
            drawCanvas(width, height);
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
