import React from "react";
import { ThemeProvider } from "@emotion/react";
import { styled } from '@mui/material/styles';
import { Box, Button, Grid, IconButton, Stack, ToggleButton, Typography } from "@mui/material";
import { grey, green, pink } from '@mui/material/colors';
import theme from "../../../../commons/theme";
import Footer, { footerHeight } from "../../../commons/Footer";
import Header from "../../../commons/Header";
import { drawTreeBasics, setBasicTreePosition } from "./tree";
import { resetCanvas } from "../../../commons/canvas";
import { treeNodes } from "./tree";

interface Props {
    containerRef: React.RefObject<HTMLDivElement>;
    canvasRef: React.RefObject<HTMLCanvasElement>;
}

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

const Basics = () => (
    <div>
        <Typography variant="h4" align="center">
            🌱 Tree Basics
        </Typography>
        <Typography
            variant="h6"
            sx={{
                fontWeight: 300,
                textAlign: "center",
            }}
        >
            Let's warm up with some basic tree concepts.
        </Typography>
    </div>
);

const FindLeafs = ({ containerRef, canvasRef }: Props) => {



    return (
        <>
            <Stack spacing={5}>
                <Basics />
                <Typography
                    variant="h5"
                    align="center"
                    sx={{
                        fontWeight: 300,
                    }}
                    gutterBottom
                >
                    what are the leaf nodes?
                </Typography>
            </Stack>
        </>
    );
};

const FindRoot = ({ containerRef, canvasRef }: Props) => {

    const [rootIndicator, setRootIndicator] = React.useState<string>();
    const [errorIndicator, setErrorIndicator] = React.useState<number>();

    const enableRootNode = () => {
        treeNodes
            .filter(node => node?.value === "root")
            .forEach(node => {
                if (node) {
                    node.selected = true;
                    node.emoji = "root";
                }
            });
    }

    const handleClick = (i: number, value: string | null | undefined) => {
        if (rootIndicator) {
            return;
        }
        setErrorIndicator(undefined);
        if (value === "root") {
            setRootIndicator(value);
            enableRootNode();
            refreshCanvas(containerRef, canvasRef);
        } else {
            setErrorIndicator(i);
        };
    }

    return (
        <Stack spacing={5}>
            <Basics />

            <div>
                <Typography
                    variant="h5"
                    align="center"
                    sx={{
                        fontWeight: 300,
                    }}
                    gutterBottom
                >
                    What is the root of this tree?
                </Typography>

                <Stack
                    direction="row"
                    spacing={1}
                    display="flex"
                    justifyContent="center"
                >
                    {
                        treeNodes
                            .filter(node => node !== null)
                            .map((node, i) =>
                                <ToggleButton
                                    key={i}
                                    value={node?.value}
                                    sx={{
                                        width: "50px",
                                        height: "50px",
                                        minWidth: "50px",
                                        minHeight: "50px",
                                        borderRadius: "50%",
                                        textTransform: 'none',
                                        backgroundColor: (errorIndicator === i) ? pink[400] : "#fff",
                                        color: (errorIndicator === i) ? "#fff" : "#000",
                                        "&.Mui-selected": {
                                            backgroundColor: green[400],
                                            color: "#fff",
                                            '&:hover, &.Mui-focusVisible': {
                                                backgroundColor: green[400],
                                            },
                                        },
                                        '&:hover, &.Mui-focusVisible': {
                                            color: "#000",
                                        },
                                        fontSize: "25px",
                                        fontWeight: 200,
                                    }}
                                    selected={rootIndicator === node?.value}
                                    onClick={() => handleClick(i, node?.value)}
                                >
                                    {node?.text}
                                </ToggleButton>
                            )
                    }
                </Stack>
            </div>
        </Stack>
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

const Tree = ({ containerRef, canvasRef }: Props) => {

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

const Main = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    return (
        <Grid
            container
            sx={{
                flex: 1,
            }}
        >
            <Grid
                item
                xs={12}
                md={6}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    // backgroundColor: grey[100],
                }}
            >
                {/* <Game containerRef={containerRef} canvasRef={canvasRef} /> */}
                <FindRoot containerRef={containerRef} canvasRef={canvasRef} />
            </Grid>
            <Grid
                item
                xs={12}
                md={6}
            >
                <Tree containerRef={containerRef} canvasRef={canvasRef} />
            </Grid>
        </Grid>
    );
};

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
