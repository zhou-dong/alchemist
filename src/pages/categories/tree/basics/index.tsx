import React from "react";
import { ThemeProvider } from "@emotion/react";
import { Box } from "@mui/material";
import theme from "../../../../commons/theme";
import Footer, { footerHeight } from "../../../commons/Footer";
import Header from "../../../commons/Header";

const Main = () => {

    const containerRef = React.useRef<HTMLDivElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;

        if (!container || !canvas) return;

        const refreshCanvas = () => {
            const { width, top } = container.getBoundingClientRect();
            const height = window.innerHeight - top - footerHeight;

            // setBasicTreePosition(width, height);
            // drawCanvas(width, height);
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
                style={{ display: "block" }}
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
            <Footer />
        </Box>
    </ ThemeProvider>
);

export default Index;
