import * as React from 'react';
import Footer from '../../commons/Footer';
import { ThemeProvider } from '@mui/material';
import theme from '../../commons/theme';
import Logo from '../../commons/Logo';
import { getCircles } from './layouts/no-overlap-layout';
import { getCircleLayout, getForceAtlas2Layout, getRandomLayout } from './layouts/graphology-layout';
import { Category, CategoryType, categories } from './layouts/category';

const drawCircle = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    category: Category,
) => {
    const { emoji, categoryType } = category;
    const backgroundColor = "#fff";

    context.shadowColor = 'rgba(0, 0, 0, 0.5)';
    context.shadowBlur = 10;
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;

    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = backgroundColor;
    context.fill();

    context.shadowColor = '#fff';
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    context.font = '300 18px "Roboto"';
    context.fillStyle = "#000";
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    context.fillText(emoji, x, y - radius / 4);
    context.fillText(categoryType, x, y + radius / 5); // TODO
}

type LayoutMapping = { [key: string]: { x: number; y: number } };

function drawCircles(
    categories: Category[],
    radius: number,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
): void {
    // getCircles(
    //     canvas.width,
    //     canvas.height,
    //     categories.map(_ => radius)
    // ).forEach(({ x, y, radius }, index) => {
    //     drawCircle(context, x, y, radius, categories[index]);
    // });

    // const titles: string[] = categories.map(category => category.title);

    const nodes = categories.map(category => category.categoryType);

    const edges = [
        [CategoryType.HashTable, CategoryType.TwoPointers],
        [CategoryType.HashTable, CategoryType.Stack],
        [CategoryType.HashTable, CategoryType.Queue],
        [CategoryType.Stack, CategoryType.LinkedList],
        [CategoryType.Queue, CategoryType.LinkedList],
        [CategoryType.BinarySearch, CategoryType.Tree],
        [CategoryType.Tree, CategoryType.SegmentTree],
        [CategoryType.Tree, CategoryType.Heap],
        [CategoryType.Graph, CategoryType.TopologicalSort],
        [CategoryType.Graph, CategoryType.UnionFind],
        [CategoryType.TopologicalSort, CategoryType.DP],
        [CategoryType.TopologicalSort, CategoryType.DP],
    ]

    const maps = getForceAtlas2Layout(nodes, edges);

    categories.forEach(category => {
        const { x, y } = maps[category.categoryType];

        console.log(maps)

        drawCircle(context, x + canvas.width / 2, y + canvas.height / 2, radius, category);
    });









}

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

const drawCanvas = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {

    scaleCanvas(canvas, context);
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawCircles(categories, 40, canvas, context);
}

const Body = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            const context = canvas?.getContext("2d");
            if (canvas && context) {
                drawCanvas(canvas, context)
            }
        };

        // Set up event listener
        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (canvas && context) {
            drawCanvas(canvas, context);
        }
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
