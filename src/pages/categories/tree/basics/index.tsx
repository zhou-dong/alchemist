import React from "react";
import { ThemeProvider } from "@emotion/react";
import { Box, Container, Grid } from "@mui/material";
import { grey } from '@mui/material/colors';
import theme from "../../../../commons/theme";
import Footer, { footerHeight } from "../../../commons/Footer";
import Header from "../../../commons/Header";
import { drawTreeBasics, setBasicTreePosition } from "./tree";
import { resetCanvas } from "../../../commons/canvas";
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
    StepsIndicatorFab
} from "./steps";
import { BackToMainFab } from "./steps/BackToMainFab";

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
    showStepsIndicator: boolean,
}> = ({
    containerRef,
    canvasRef,
    step,
    setStep,
    showStepsIndicator
}) => {
        return (
            <>
                {step === Step.FIND_ROOT && <FindRoot containerRef={containerRef} canvasRef={canvasRef} setStep={setStep} showStepsIndicator={showStepsIndicator} />}
                {step === Step.FIND_LEAFS && <FindLeafs containerRef={containerRef} canvasRef={canvasRef} setStep={setStep} showStepsIndicator={showStepsIndicator} />}
                {step === Step.FIND_PARENT && <FindParent containerRef={containerRef} canvasRef={canvasRef} setStep={setStep} showStepsIndicator={showStepsIndicator} />}
                {step === Step.FIND_CHILDREN && <FindChildren containerRef={containerRef} canvasRef={canvasRef} setStep={setStep} showStepsIndicator={showStepsIndicator} />}
                {step === Step.TREE_HEIGHT && <TreeHeight containerRef={containerRef} canvasRef={canvasRef} setStep={setStep} showStepsIndicator={showStepsIndicator} />}
                {step === Step.PREORDER_TRAVERSAL && <PreorderTraversal containerRef={containerRef} canvasRef={canvasRef} setStep={setStep} showStepsIndicator={showStepsIndicator} />}
                {step === Step.INORDER_TRAVERSAL && <InorderTraversal containerRef={containerRef} canvasRef={canvasRef} setStep={setStep} showStepsIndicator={showStepsIndicator} />}
                {step === Step.POSTORDER_TRAVERSAL && <PostorderTraversal containerRef={containerRef} canvasRef={canvasRef} setStep={setStep} showStepsIndicator={showStepsIndicator} />}
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
    const [showStepsIndicator, setShowStepsIndicator] = React.useState(true);

    const toggleStepsIndicator = () => {
        setShowStepsIndicator(!showStepsIndicator);
    };

    return (
        <>
            <Grid
                container
                sx={{
                    flex: 1,
                    backgroundColor: '#FFFFFF',
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
                        backgroundColor: '#FFFFFF',
                        borderRight: { md: '1px solid #DDDDDD' },
                        overflowY: 'auto',
                    }}
                >
                    <Game
                        containerRef={containerRef}
                        canvasRef={canvasRef}
                        step={step}
                        setStep={setStep}
                        showStepsIndicator={showStepsIndicator}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        backgroundColor: '#F7F7F7',
                        position: 'relative',
                    }}
                >
                    <Tree containerRef={containerRef} canvasRef={canvasRef} />
                </Grid>
            </Grid>
            <StepsIndicatorFab
                showStepsIndicator={showStepsIndicator}
                onToggle={toggleStepsIndicator}
            />
            <BackToMainFab />
        </>
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