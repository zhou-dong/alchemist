import React from "react";
import { ThemeProvider } from "@emotion/react";
import { styled } from '@mui/material/styles';
import { Box, Chip, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { grey } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import theme from "../../../../commons/theme";
import Footer, { footerHeight } from "../../../commons/Footer";
import Header from "../../../commons/Header";
import { drawTreeBasics, setBasicTreePosition } from "./tree";
import { resetCanvas } from "../../../commons/canvas";
import { treeNodes } from "./tree";

function refreshCanvas(
    containerRef: React.RefObject<HTMLDivElement>,
    canvasRef: React.RefObject<HTMLCanvasElement>,
): void {

    const container = containerRef.current
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!container || !canvas || !context) return;

    const { width, top } = container.getBoundingClientRect();
    const height = window.innerHeight - top - footerHeight;

    setBasicTreePosition(width, height);
    resetCanvas(canvas, context, width, height);
    drawTreeBasics(context);
}

const QuestionPosition = styled(Stack)({
    position: "absolute",
    bottom: "15%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
});

const FindRoot: React.FC<{
    containerRef: React.RefObject<HTMLDivElement>,
    canvasRef: React.RefObject<HTMLCanvasElement>
}> = ({ containerRef, canvasRef }) => {

    const [root, setRoot] = React.useState<string>();

    const handleClick = (event: React.MouseEvent, value: string | null) => {
        if (value === "root") {
            setRoot(value);
            treeNodes
                .filter(node => node?.value === "root")
                .forEach(node => {
                    if (node) {
                        node.selected = true;
                        node.emoji = "root";
                    }
                })
            refreshCanvas(containerRef, canvasRef);
        };
    }

    return (
        <>
            <Typography
                variant="h5"
                sx={{
                    fontWeight: 300,
                    textAlign: "center",
                }}
            >
                Let's warm up with some basic tree concepts. What is the root of a tree?
            </Typography>

            <Stack
                direction="row"
                spacing={2}
            >
                {
                    treeNodes
                        .filter(node => node !== null)
                        .map((node, i) =>
                            <ToggleButton
                                key={i}
                                value={node?.value}
                                sx={{
                                    width: "55px",
                                    height: "55px",
                                    fontSize: "30px",
                                    fontWeight: 200,
                                    borderRadius: "50%",
                                }}
                                onChange={handleClick}
                                selected={root === node?.value}
                            >
                                {node?.text}
                            </ToggleButton>
                        )
                }
            </Stack>
        </>
    );
}

const Game: React.FC<{
    containerRef: React.RefObject<HTMLDivElement>,
    canvasRef: React.RefObject<HTMLCanvasElement>
}> = ({ containerRef, canvasRef }) => (
    <QuestionPosition
        spacing={2}
    >


        <FindRoot containerRef={containerRef} canvasRef={canvasRef} />
    </QuestionPosition>
);

const Main: React.FC<{
    containerRef: React.RefObject<HTMLDivElement>,
    canvasRef: React.RefObject<HTMLCanvasElement>
}> = ({ containerRef, canvasRef }) => {

    React.useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;

        if (!container || !canvas) return;

        refreshCanvas(containerRef, canvasRef);

        const resizeObserver = new ResizeObserver(() => refreshCanvas(containerRef, canvasRef));

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

const Index = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    return (
        <ThemeProvider theme={theme}>
            <Box
                display="flex"
                flexDirection="column"
                minHeight="100vh"
            >
                <Header />
                <Main containerRef={containerRef} canvasRef={canvasRef} />
                <Game containerRef={containerRef} canvasRef={canvasRef} />
                <Footer />
            </Box>
        </ ThemeProvider>
    );
}

export default Index;
