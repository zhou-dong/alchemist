import React from "react";
import { ThemeProvider } from "@emotion/react";
import { Box } from "@mui/material";
import theme from "../../../../commons/theme";
import Footer from "../../../commons/Footer";
import Header from "../../../commons/Header";
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
    StepsIndicatorFab,
    StepsIndicator
} from "./steps";
import { BackToMainFab } from "./steps/BackToMainFab";


const Game: React.FC<{
    containerRef: React.RefObject<HTMLDivElement>,
    canvasRef: React.RefObject<HTMLCanvasElement>,
    step: Step,
    setStep: React.Dispatch<React.SetStateAction<Step>>,
    setShowStepsIndicator: React.Dispatch<React.SetStateAction<boolean>>
}> = ({
    containerRef,
    canvasRef,
    step,
    setStep,
    setShowStepsIndicator
}) => {
        return (
            <>
                {step === Step.FIND_ROOT && <FindRoot containerRef={containerRef} canvasRef={canvasRef} setStep={setStep} setShowStepsIndicator={setShowStepsIndicator} />}
                {step === Step.FIND_LEAFS && <FindLeafs containerRef={containerRef} canvasRef={canvasRef} setStep={setStep} setShowStepsIndicator={setShowStepsIndicator} />}
                {step === Step.FIND_PARENT && <FindParent containerRef={containerRef} canvasRef={canvasRef} setStep={setStep} setShowStepsIndicator={setShowStepsIndicator} />}
                {step === Step.FIND_CHILDREN && <FindChildren containerRef={containerRef} canvasRef={canvasRef} setStep={setStep} setShowStepsIndicator={setShowStepsIndicator} />}
                {step === Step.TREE_HEIGHT && <TreeHeight containerRef={containerRef} canvasRef={canvasRef} setStep={setStep} setShowStepsIndicator={setShowStepsIndicator} />}
                {step === Step.PREORDER_TRAVERSAL && <PreorderTraversal containerRef={containerRef} canvasRef={canvasRef} setStep={setStep} setShowStepsIndicator={setShowStepsIndicator} />}
                {step === Step.INORDER_TRAVERSAL && <InorderTraversal containerRef={containerRef} canvasRef={canvasRef} setStep={setStep} setShowStepsIndicator={setShowStepsIndicator} />}
                {step === Step.POSTORDER_TRAVERSAL && <PostorderTraversal containerRef={containerRef} canvasRef={canvasRef} setStep={setStep} setShowStepsIndicator={setShowStepsIndicator} />}
            </>
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
            {showStepsIndicator && <StepsIndicator currentStep={step} />}

            <Game
                containerRef={containerRef}
                canvasRef={canvasRef}
                step={step}
                setStep={setStep}
                setShowStepsIndicator={setShowStepsIndicator}
            />

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