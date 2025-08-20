import React from 'react';
import { animate, parallel, } from 'obelus';
import { createDualRenderer, createOrthographicCamera } from "../../../../../../utils/threeUtils";
import { WrapperProvider } from '../../components/wrapper/WrapperProvider';
import { buildAnimateSteps, type PlayableStep } from 'obelus-gsap-player';
import { useThreeContainer } from "../../../../../../hooks/useThreeContainer";
import { useThreeAutoResize } from "../../../../../../hooks/useThreeAutoResize";
import { DualScene, defaultTheme, latex, type StepSceneThree, render, axis, text } from 'obelus-three-render';
import PlayButton from '../../components/PlayButton';
import { AnimationController } from "../../../../../../utils/animation-controller";
import { ORDER_STATISTICS_TO_KMV_FORMULAS } from './order-statistics-to-kth-smallest-estimation-latex';
import NextPageButton from '../../components/NextPageButton';
import StartButton from '../../components/StartButton';

const { axisStyle, textStyle } = defaultTheme;

const latexes = ORDER_STATISTICS_TO_KMV_FORMULAS.map((formula, index) => {
    const top = window.innerHeight / 4 - window.innerHeight;
    const lineHeight: number = window.innerHeight / 2 / ORDER_STATISTICS_TO_KMV_FORMULAS.length;
    const y = top - (index * lineHeight);
    return latex(`formula_${index}`, formula, { y }, textStyle);
});

const displayLatexesSteps = latexes.map((_, index) => {
    return animate(`formula_${index}`, { position: { y: `+=${window.innerHeight}` } }, { duration: 1 });
});

const moveLatexesToLeftSteps = latexes.map((_, index) => {
    const distance = window.innerWidth / 4;
    return animate(`formula_${index}`, { position: { x: `-=${distance}` } }, { duration: 1 });
});

const ONE_THIRD_N_LATEX = `
n = \\frac{k}{\\theta} - 1
= \\frac{1}{\\frac{1}{3}} - 1
= 1 \\times {\\frac{3}{1}} - 1
= 3 - 1
= 2
`;

const TWO_THIRDS_N_LATEX = `
n = \\frac{k}{\\theta} - 1
= \\frac{2}{\\frac{2}{3}} - 1
= 2 \\times {\\frac{3}{2}} - 1
= 3 - 1
= 2
`;

const buildAxis = () => {
    const y = window.innerHeight / 16 * 3 - window.innerHeight;
    const start = { x: 0, y: y, z: 0, };
    const end = { x: window.innerWidth / 8 * 3, y: y, z: 0, };
    const axisLine = axis("axis", start, end, { ...axisStyle, dotCount: 4 });
    const axisStart = text("axis_start", "0", { ...start, y: y - 15 }, textStyle);
    const axisEnd = text("axis_end", "1", { ...end, y: y - 15 }, textStyle);

    const oneThird = latex("one_third", "\\frac{1}{3}", { ...start, x: window.innerWidth / 8, y: y - 35 }, textStyle);
    const oneThirdK = latex("one_third_k", "k = 1", { ...start, x: window.innerWidth / 8, y: y - 80 }, textStyle);
    const oneThirdTheta = latex("one_third_theta", "\\theta = \\frac{1}{3}", { ...start, x: window.innerWidth / 8, y: y - 120 }, textStyle);
    const oneThirdN = latex("one_third_n", ONE_THIRD_N_LATEX, { ...start, x: window.innerWidth / 16 * 3, y: y - 200 }, textStyle);

    const twoThirds = latex("two_thirds", "\\frac{2}{3}", { ...start, x: window.innerWidth / 8 * 2, y: y - 35 }, textStyle);
    const twoThirdsK = latex("two_thirds_k", "k = 2", { ...start, x: window.innerWidth / 8 * 2, y: y - 80 }, textStyle);
    const twoThirdsTheta = latex("two_thirds_theta", "\\theta = \\frac{2}{3}", { ...start, x: window.innerWidth / 8 * 2, y: y - 120 }, textStyle);
    const twoThirdsN = latex("two_thirds_n", TWO_THIRDS_N_LATEX, { ...start, x: window.innerWidth / 16 * 3, y: y - 280 }, textStyle);
    return [axisLine, axisStart, axisEnd, oneThird, twoThirds, oneThirdK, oneThirdTheta, oneThirdN, twoThirdsK, twoThirdsTheta, twoThirdsN];
}

const moveAxisSteps = () => {
    const ids = ["axis", "axis_start", "axis_end", "one_third", "two_thirds"];
    return ids.map(id => animate(id, { position: { y: `+=${window.innerHeight}` } }, { duration: 1 }));
};

const moveMarks = () => {
    const ids = ["one_third_k", "one_third_theta", "one_third_n", "two_thirds_k", "two_thirds_theta", "two_thirds_n"];
    return ids.map(id => animate(id, { position: { y: `+=${window.innerHeight}` } }, { duration: 1 }));
};

const stepScene: StepSceneThree = {
    objects: [
        ...latexes,
        ...buildAxis(),
    ],
    steps: [
        ...displayLatexesSteps,
        parallel([...moveLatexesToLeftSteps, ...moveAxisSteps()]),
        ...moveMarks(),
    ],
}

const renderer = createDualRenderer();
const camera = createOrthographicCamera();
const scene = new DualScene();
const animationController = new AnimationController(renderer, scene, camera);

const record = render(stepScene.objects, scene as any);
let steps: PlayableStep[] = buildAnimateSteps(
    stepScene.steps,
    record,
    animationController.startAnimation,
    animationController.stopAnimation
);

let index = 0;
let componentLevelShowStepper: boolean = true;
let componentLevelShowNextPageButton: boolean = false;

function KmvPageContent(
    {
        showStepper,
        setShowStepper,
    }: {
        showStepper: boolean;
        setShowStepper: React.Dispatch<React.SetStateAction<boolean>>;
    }
) {
    const [disabled, setDisabled] = React.useState(false);
    const [showNextPageButton, setShowNextPageButton] = React.useState(false);
    const [showPlayerButton, setShowPlayerButton] = React.useState(false);

    const { containerRef } = useThreeContainer(renderer);
    useThreeAutoResize(containerRef, renderer, scene, camera);

    React.useEffect(() => {
        setShowStepper(componentLevelShowStepper);
        setShowNextPageButton(componentLevelShowNextPageButton);
        return () => {
            animationController.stopAnimation();
        };
    }, []);

    const onClick = async () => {
        if (index === steps.length) {
            return;
        }

        setDisabled(true);
        await steps[index].play();

        if (index === steps.length - 1) {
            setShowNextPageButton(true);
            componentLevelShowNextPageButton = true;
        } else {
            setDisabled(false);
        }

        index = index + 1;
    };

    const handleStart = () => {
        setShowStepper(false);
        componentLevelShowStepper = false;
        setShowPlayerButton(true);
    };

    return (
        <>
            {showStepper && <StartButton onStart={handleStart} />}
            {showNextPageButton && <NextPageButton nextPagePath="/algorithms/statistics/sketches/theta/steps/kmv" title="Go to KMV" />}
            {showPlayerButton && <PlayButton index={index} steps={steps} disabled={disabled} onClick={onClick} />}
            <div ref={containerRef} style={{ width: '100vw', height: '100vh', }} />
        </>
    );
}

export default function KthSmallestEstimationPage() {
    const [showStepper, setShowStepper] = React.useState(true);

    return (
        <WrapperProvider title="K-th Smallest Estimation" activeStep={1} showStepper={showStepper} setShowStepper={setShowStepper}>
            <KmvPageContent showStepper={showStepper} setShowStepper={setShowStepper} />
        </WrapperProvider>
    );
}
