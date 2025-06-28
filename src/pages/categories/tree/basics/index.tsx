import React from "react";
import { ThemeProvider } from "@emotion/react";
import { styled } from '@mui/material/styles';
import { Box, Grid, Stack, ToggleButton, Typography } from "@mui/material";
import { grey, green, pink } from '@mui/material/colors';
import theme from "../../../../commons/theme";
import Footer, { footerHeight } from "../../../commons/Footer";
import Header from "../../../commons/Header";
import { drawTreeBasics, setBasicTreePosition } from "./tree";
import { resetCanvas } from "../../../commons/canvas";
import { treeNodes } from "./tree";

enum Step {
    FIND_ROOT,
    FIND_LEAFS,
}

interface Props {
    containerRef: React.RefObject<HTMLDivElement>;
    canvasRef: React.RefObject<HTMLCanvasElement>;
    setStep: React.Dispatch<React.SetStateAction<Step>>;
}

function refreshCanvas(
    containerRef: React.RefObject<HTMLDivElement>,
    canvasRef: React.RefObject<HTMLCanvasElement>,
): void {

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!container || !canvas || !context) return;

    const { width, top } = container.getBoundingClientRect();
    const height = window.innerHeight - top - footerHeight;

    setBasicTreePosition(width, height);
    resetCanvas(canvas, context, width, height);
    drawTreeBasics(context);
}

const StyledButton = styled(ToggleButton)({
    width: "50px",
    height: "50px",
    minWidth: "50px",
    minHeight: "50px",
    borderRadius: "50%",
    textTransform: 'none',
    '&:hover, &.Mui-focusVisible': {
        color: "#000",
    },
    "&.Mui-selected": {
        backgroundColor: green[400],
        color: "#fff",
        '&:hover, &.Mui-focusVisible': {
            backgroundColor: green[400],
        },
    },
    fontSize: "25px",
    fontWeight: 200,
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

    const [selected, setSelected] = React.useState<number[]>([]);
    const [errorIndicator, setErrorIndicator] = React.useState<number>();



    return (
        <>
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
                        What are the leaf nodes?
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                    >
                        {
                            treeNodes
                                .filter(node => node !== null)
                                .map((node, i) =>
                                    <StyledButton
                                        key={i}
                                        value={node?.value}
                                        sx={{
                                            backgroundColor: (errorIndicator === i) ? pink[400] : "#fff",
                                            color: (errorIndicator === i) ? "#fff" : "#000",
                                        }}
                                        disabled={i === 0}
                                        selected={selected.indexOf(i) >= 0}
                                    // onClick={() => handleClick(i, node?.value)}
                                    >
                                        {node?.text}
                                    </StyledButton>
                                )
                        }
                    </Stack>
                </div>
            </Stack>
        </>
    );
};

const FindRoot = ({ containerRef, canvasRef, setStep }: Props) => {

    const delay = 2000;

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
            setTimeout(() => setStep(Step.FIND_LEAFS), delay);
        } else {
            setErrorIndicator(i);
        };
    }

    return (
        <Stack
            spacing={5}
            style={{
                transition: "opacity 2.5s ease-in-out"
            }}
        >
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
                    justifyContent="center"
                >
                    {
                        treeNodes
                            .filter(node => node !== null)
                            .map((node, i) =>
                                <StyledButton
                                    key={i}
                                    value={node?.value}
                                    sx={{
                                        backgroundColor: (errorIndicator === i) ? pink[400] : "#fff",
                                        color: (errorIndicator === i) ? "#fff" : "#000",
                                    }}
                                    disabled={rootIndicator !== undefined && rootIndicator !== node?.value}
                                    selected={rootIndicator === node?.value}
                                    onClick={() => handleClick(i, node?.value)}
                                >
                                    {node?.text}
                                </StyledButton>
                            )
                    }
                </Stack>
            </div>
        </Stack >
    );
}

const Game: React.FC<{
    containerRef: React.RefObject<HTMLDivElement>,
    canvasRef: React.RefObject<HTMLCanvasElement>,
    step: Step,
    setStep: React.Dispatch<React.SetStateAction<Step>>,
}> = ({
    containerRef,
    canvasRef,
    step,
    setStep
}) => {
        return (
            <>
                {step === Step.FIND_ROOT && <FindRoot containerRef={containerRef} canvasRef={canvasRef} setStep={setStep} />}
                {step === Step.FIND_LEAFS && <FindLeafs containerRef={containerRef} canvasRef={canvasRef} setStep={setStep} />}
            </>
        );
    }

const Tree: React.FC<{
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

const Main = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const [step, setStep] = React.useState<Step>(Step.FIND_ROOT);

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
                }}
            >
                <Game containerRef={containerRef} canvasRef={canvasRef} step={step} setStep={setStep} />
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
