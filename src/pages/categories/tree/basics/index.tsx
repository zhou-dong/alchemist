import React from "react";
import { ThemeProvider } from "@emotion/react";
import { Box } from "@mui/material";
import theme from "../../../../commons/theme";
import Footer from "../../../commons/Footer";
import Header from "../../../commons/Header";

const Main = () => {

    const containerRef = React.useRef<HTMLDivElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

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
