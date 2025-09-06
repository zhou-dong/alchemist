import React from "react";
import { ThemeProvider } from "@emotion/react";
import { Box, Grid, Container, Button } from "@mui/material";
import { grey } from '@mui/material/colors';
import theme from "../../../../commons/theme";
import Footer, { footerHeight } from "../../../commons/Footer";
import Header from "../../../commons/Header";
import { drawTreeBasics, setBasicTreePosition } from "./tree";
import { resetCanvas } from "../../../commons/canvas";
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    FindRoot,
    FindLeafs,
    FindParent,
    FindChildren,
    TreeHeight,
    PreorderTraversal,
    InorderTraversal,
    PostorderTraversal,
    Step,
    StepProps
} from "./steps";

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
        const navigate = useNavigate();
        return (
            <>
                {step === Step.FIND_ROOT && <FindRoot containerRef={containerRef} canvasRef={canvasRef} setStep={setStep} />}
                {step === Step.FIND_LEAFS && <FindLeafs containerRef={containerRef} canvasRef={canvasRef} setStep={setStep} />}
                {step === Step.FIND_PARENT && <FindParent containerRef={containerRef} canvasRef={canvasRef} setStep={setStep} />}
                {step === Step.FIND_CHILDREN && <FindChildren containerRef={containerRef} canvasRef={canvasRef} setStep={setStep} />}
                {step === Step.TREE_HEIGHT && <TreeHeight containerRef={containerRef} canvasRef={canvasRef} setStep={setStep} />}
                {step === Step.PREORDER_TRAVERSAL && <PreorderTraversal containerRef={containerRef} canvasRef={canvasRef} setStep={setStep} />}
                {step === Step.INORDER_TRAVERSAL && <InorderTraversal containerRef={containerRef} canvasRef={canvasRef} setStep={setStep} />}
                {step === Step.POSTORDER_TRAVERSAL && <PostorderTraversal containerRef={containerRef} canvasRef={canvasRef} setStep={setStep} />}

                <Container maxWidth="lg" sx={{ marginTop: 4 }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate("/pages/categories/tree")}
                        sx={{
                            color: '#717171',
                            textTransform: 'none',
                            fontWeight: 600,
                            mb: 3,
                            '&:hover': {
                                backgroundColor: '#F7F7F7',
                            },
                        }}
                    >
                        Back to Tree
                    </Button>
                </Container>
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

        let timeoutId: NodeJS.Timeout;
        const resizeObserver = new ResizeObserver(() => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                try {
                    refreshCanvas(containerRef, canvasRef);
                } catch (error) {
                    console.warn('Canvas resize error:', error);
                }
            }, 16);
        });

        resizeObserver.observe(container);

        return () => {
            clearTimeout(timeoutId);
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
        <Container maxWidth="xl" sx={{ marginTop: 4 }}>
            <Game containerRef={containerRef} canvasRef={canvasRef} step={step} setStep={setStep} />
        </Container>
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
    </ThemeProvider>
);

export default Index;