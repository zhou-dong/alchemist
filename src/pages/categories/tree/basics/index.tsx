import React from "react";
import { ThemeProvider } from "@emotion/react";
import { styled } from '@mui/material/styles';
import { Box, Typography } from "@mui/material";
import { grey } from '@mui/material/colors';
import theme from "../../../../commons/theme";
import Footer, { footerHeight } from "../../../commons/Footer";
import Header from "../../../commons/Header";
import { drawTreeBasics, setBasicTreePosition } from "./tree";
import { resetCanvas } from "../../../commons/canvas";

const MessagePosition = styled('div')({
    position: "absolute",
    bottom: "15%",
    left: "50%",
    transform: "translate(-50%, -50%)",
});

const Game = () => {
    return (
        <MessagePosition>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 300
                }}
            >
                Let's warm up with some basic tree concepts.
            </Typography>
        </MessagePosition>
    );
}

const Main = () => {

    const containerRef = React.useRef<HTMLDivElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    function drawCanvas(width: number, height: number): void {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (canvas && context) {
            resetCanvas(canvas, context, width, height);
            drawTreeBasics(context);
        }
    }

    React.useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;

        if (!container || !canvas) return;

        const refreshCanvas = () => {
            const { width, top } = container.getBoundingClientRect();
            const height = window.innerHeight - top - footerHeight;

            setBasicTreePosition(width, height);
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
            style={{ flex: 1 }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    display: "block",
                    backgroundColor: grey[50],
                }}
            />
        </div>
    );
}

const Index = () => (
    <ThemeProvider theme={theme}>
        <Box
            display="flex"
            flexDirection="column"
            minHeight="100vh"
        >
            <Header />
            <Main />
            <Game />
            <Footer />
        </Box>
    </ ThemeProvider>
);

export default Index;
