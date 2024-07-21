import * as React from 'react';
import Footer from '../../commons/Footer';
import { ThemeProvider } from '@mui/material';
import theme from '../../commons/theme';
import Logo from '../../commons/Logo';

interface Category {
    emoji: string;
    title: string;
}

interface Circle {
    x: number;
    y: number;
}

function isOverlap(x: number, y: number, radius: number, circles: Circle[]) {
    for (let circle of circles) {
        const dx = x - circle.x;
        const dy = y - circle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 2 * radius) {
            return true;
        }
    }
    return false;
}

const drawCircle = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    category: Category,
) => {
    const { emoji, title } = category;
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
    context.fillText(title, x, y + radius / 5);
}

function drawCircles(
    categories: Category[],
    radius: number,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
): void {
    const circles: Circle[] = [];
    let index = 0;
    let attempts = 0;
    const maxAttempts = 1000; // Limit attempts to avoid infinite loop

    const widthAdjust = 0 // canvas.width / 10;
    const heightAdjust = 0 //canvas.height / 10;

    while (circles.length < categories.length && attempts < maxAttempts) {
        const x = Math.random() * (canvas.width - 2 * radius - widthAdjust) + radius;
        const y = Math.random() * (canvas.height - 2 * radius - heightAdjust) + radius;
        if (!isOverlap(x, y, radius, circles)) {
            circles.push({ x, y });
            drawCircle(context, x, y, radius, categories[index]);
            index++;
        }
        attempts++;
    }

    // If maxAttempts exceeded, generate remaining circles without overlap check
    while (circles.length < categories.length) {
        const x = Math.random() * (canvas.width - 2 * radius) + radius;
        const y = Math.random() * (canvas.height - 2 * radius) + radius;
        circles.push({ x, y });
        drawCircle(context, x, y, radius, categories[index]);
        index++;
    }
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

    const categories: Category[] = [
        { title: "Heap", emoji: "⏳" },
        { title: "Stack", emoji: "📚" },
        { title: "Queue", emoji: "🚶‍♂️🚶‍♂️" },
        { title: "Sorting", emoji: "🔄" },
        { title: "Tree", emoji: "🌳" },
        { title: "Segment Tree", emoji: "🌲" },
        { title: "Union Find", emoji: "🔗" },
        { title: "Binary Search", emoji: "🔍" },
        { title: "Two Pointers", emoji: "➡️➡️" },
        { title: "DP", emoji: "🧩" },
        { title: "Graph", emoji: "🌐" },
        { title: "Recursion", emoji: "🌀" },
        { title: "Linked List", emoji: "🖇️" },
        { title: "Hash Table", emoji: "🗂️" },
        { title: "Topological Sort", emoji: "🔣" },
    ]
    drawCircles(categories, 80, canvas, context);
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
