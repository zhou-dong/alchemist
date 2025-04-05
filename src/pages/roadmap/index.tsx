import * as React from 'react';
import Footer, { footerHeight } from '../commons/Footer';
import { Box, Grid, styled, ThemeProvider } from '@mui/material';
import theme from '../../commons/theme';
import { connections } from './layouts/category';
import { ContentCircle, drawArrow, drawCircle, Dragger } from '../commons/circle';
import { getFixedTreeLayout } from './layouts/fixed-position-layout';
import Divider from '@mui/material/Divider';
import Algorithms from "../commons/List";
import Slogan from './Slogan';
import { useGames } from '../../games/commons/GamesContext';
import Header from '../commons/Header';
import { resetCanvas } from '../commons/canvas';
import Category from '../../games/commons/segments/category';

const updateSegments = <T,>(segments: T[], segment: T, selected: boolean): T[] => {
    const set = new Set(segments);
    selected ? set.add(segment) : set.delete(segment);
    return Array.from(set);
}

const drawCircles = (context: CanvasRenderingContext2D, circles: ContentCircle<Category>[]) => {
    const map = new Map(circles.map(circle => [circle.value, circle]));

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

let containerWidth = 0;
let containerHeight = 0;
const mainPadding = 10;

let circles: ContentCircle<Category>[] = [];

/**
 * To differentiate between a drag and a click, you can use a combination of mouse events and a time threshold. 
 * The idea is to record the mouse down and mouse up events and calculate the time difference and distance moved. 
 * If the time is short and the distance is small, it is considered a click. Otherwise, it is considered a drag.
*/
const Roadmap: React.FC<{ algoContainerRef: React.RefObject<HTMLDivElement> }> = ({ algoContainerRef }) => {
    const { setCategories } = useGames();

    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    function drawCanvas(width: number, height: number): void {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (canvas && context) {
            resetCanvas(canvas, context, width, height);
            drawCircles(context, circles);
        }
    }

    const handleClick = (circle: ContentCircle<Category>) => {
        circle.selected = !circle.selected;
        setCategories(items => updateSegments(items, circle.value, circle.selected));
        drawCanvas(containerWidth, containerHeight);
    }

    const draggable = new Dragger<Category>(drawCanvas, handleClick);

    React.useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;

        canvas.addEventListener('mousedown', (e) => draggable.handleMouseDown(e, circles));
        canvas.addEventListener('mousemove', (e) => draggable.handleMouseMove(e, containerWidth, containerHeight));
        canvas.addEventListener('mouseup', (e) => draggable.handleMouseUp(e, circles));

        return () => {
            canvas.removeEventListener('mousedown', (e) => draggable.handleMouseDown(e, circles));
            canvas.removeEventListener('mousemove', (e) => draggable.handleMouseMove(e, containerWidth, containerHeight));
            canvas.removeEventListener('mouseup', (e) => draggable.handleMouseUp(e, circles));
        };
    }, [canvasRef, setCategories]);

    React.useEffect(() => {
        const containerElement = containerRef.current;
        const algoContainerElement = algoContainerRef.current;

        if (!containerElement || !algoContainerElement) return;

        const refreshCanvas = () => {

            const { width, top } = containerElement.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const height = windowHeight - top - footerHeight - mainPadding;

            circles = getFixedTreeLayout(width, height);
            containerWidth = width;
            containerHeight = height;
            drawCanvas(width, height);

            containerElement.style.height = height + "px";
            algoContainerElement.style.height = height + "px";
        };

        refreshCanvas();

        const resizeObserver = new ResizeObserver(() => {
            refreshCanvas();
        });

        resizeObserver.observe(containerElement);

        return () => {
            resizeObserver.unobserve(containerElement);
        };
    }, [containerRef, algoContainerRef])

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                maxWidth: '3800px',
            }}
        >
            <canvas
                ref={canvasRef}
            />
        </div>
    );
}

const AlgorithmsContainer = styled("div")(({ theme }) => ({
    overflow: 'auto',
}));

const Main = () => {

    const algoContainerRef = React.useRef<HTMLDivElement>(null);

    const xs = 12;
    const sm = 6;
    const md = 4;
    const lg = 6;
    const xl = 3;

    return (
        <ThemeProvider theme={theme}>
            <Box
                display="flex"
                flexDirection="column"
                minHeight="100vh"
            >
                <Header />
                <Slogan />
                <Divider />
                <Grid
                    container
                    spacing={1}
                    style={{
                        paddingTop: mainPadding + "px",
                        paddingRight: "20px",
                    }}
                >
                    <Grid item xs={12} md={12} lg={7} xl={6.5} >
                        <Roadmap algoContainerRef={algoContainerRef} />
                    </Grid>
                    <Grid item xs={12} md={12} lg={5} xl={5.5}>
                        <AlgorithmsContainer ref={algoContainerRef}>
                            <Algorithms xs={xs} sm={sm} md={md} lg={lg} xl={xl} />
                        </AlgorithmsContainer>
                    </Grid>
                </Grid>
                <Footer />
            </Box>
        </ThemeProvider>
    );
};

export default Main;
