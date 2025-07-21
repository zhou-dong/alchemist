import React from 'react';
import { useNavigate } from 'react-router-dom';
import { animate, parallel, } from 'obelus';
import * as PlayArrow from '@mui/icons-material/PlayArrow';
import * as ArrowForward from '@mui/icons-material/ArrowForward';
import * as RocketLaunch from '@mui/icons-material/RocketLaunch';
import { createDualRenderer, createOrthographicCamera } from '../../utils/threeUtils';
import { WrapperProvider } from './wrapper/WrapperProvider';
import { StepScenePlayer, type PlayableStep } from '../../../../obelus-gsap-player/dist';
import { useThreeContainer } from '../../hooks/useThreeContainer';
import { useThreeAutoResize } from '../../hooks/useThreeAutoResize';
import { type StepSceneThree, render, axis, latex, axisStyle, textStyle, ringStyle, ring, text, DualScene } from 'obelus-three-render';
import { Button } from '@mui/material';
import { AnimationController } from '../../utils/animation-controller';

const PlayArrowIcon = PlayArrow.default as unknown as React.ElementType;
const ArrowForwardIcon = ArrowForward.default as unknown as React.ElementType;
const RocketLaunchIcon = RocketLaunch.default as unknown as React.ElementType;

const y = 0 - window.innerHeight / 2 - 30;
const axisStart = () => ({ x: -500, y, z: 0, });
const axisEnd = () => ({ x: 500, y, z: 0, });

const scaleYAdjector = -35;
const scale0 = () => {
    const { x, y, z } = axisStart();
    return { x, y: y + scaleYAdjector, z };
}

const scale1 = () => {
    const { x, y, z } = axisEnd();
    return { x, y: y + scaleYAdjector, z };
}

function computeAxisXDistance(count: number, k: number) {
    const height = window.innerHeight;
    const step = height / (count + 1);
    return step * (count - k + 1); // - height / 2;
}

function scaleK(dotCount: number, k: number) {
    const start = axisStart();
    const end = axisEnd();
    const width = end.x - start.x;
    const step = width / (dotCount + 1);
    const x = start.x + step * k;
    return x;
}

const OrderStatisticsExpression = `\\mathbb{E}[X_{(k)}] = \\frac{k}{n+1}`;
const BetaDistributionExpectedValueExpression = `
\\mathbb{E}[\\text{Beta}(\\alpha, \\beta)] = \\frac{\\alpha}{\\alpha + \\beta}

\\quad \\Rightarrow \\quad
\\mathbb{E}[X_{(k)}] = \\frac{k}{k + (n - k + 1)}

\\quad\\Rightarrow \\quad
\\mathbb{E}[X_{(k)}] = \\frac{k}{n + 1}
`;

const kTh = (k: number, n: string) => `\\frac{${k}}{\\text{${n}}}`;

const stepScene: StepSceneThree = {
    objects: [
        axis("axis_1", axisStart(), axisEnd(), { ...axisStyle, dotCount: 3 }),
        text("axis_1_start", "0", scale0(), textStyle),
        text("axis_1_end", "1", scale1(), textStyle),
        latex("axis_1_k_1", "\\frac{1}{2}", { ...axisStart(), x: scaleK(1, 1) }, textStyle),

        axis("axis_2", axisStart(), axisEnd(), { ...axisStyle, dotCount: 4 }),
        text("axis_2_start", "0", scale0(), textStyle),
        text("axis_2_end", "1", scale1(), textStyle),
        latex("axis_2_k_1", "\\frac{1}{3}", { ...axisStart(), x: scaleK(2, 1) }, textStyle),
        latex("axis_2_k_2", "\\frac{2}{3}", { ...axisStart(), x: scaleK(2, 2) }, textStyle),

        axis("axis_3", axisStart(), axisEnd(), { ...axisStyle, dotCount: 5 }),
        text("axis_3_start", "0", scale0(), textStyle),
        text("axis_3_end", "1", scale1(), textStyle),
        latex("axis_3_k_1", "\\frac{1}{4}", { ...axisStart(), x: scaleK(3, 1) }, textStyle),
        latex("axis_3_k_2", "\\frac{2}{4}", { ...axisStart(), x: scaleK(3, 2) }, textStyle),
        latex("axis_3_k_3", "\\frac{3}{4}", { ...axisStart(), x: scaleK(3, 3) }, textStyle),

        // expression
        latex("axis_1_k_1_expression_1", `= ${kTh(1, '1 + 1')}`, { ...axisStart(), x: scaleK(1, 1) + 50 }, textStyle),
        latex("axis_2_k_1_expression_1", `= ${kTh(1, '2 + 1')}`, { ...axisStart(), x: scaleK(2, 1) + 50 }, textStyle),
        latex("axis_2_k_2_expression_1", `= ${kTh(2, '2 + 1')}`, { ...axisStart(), x: scaleK(2, 2) + 50 }, textStyle),
        latex("axis_3_k_1_expression_1", `= ${kTh(1, '3 + 1')}`, { ...axisStart(), x: scaleK(3, 1) + 50 }, textStyle),
        latex("axis_3_k_2_expression_1", `= ${kTh(2, '3 + 1')}`, { ...axisStart(), x: scaleK(3, 2) + 50 }, textStyle),
        latex("axis_3_k_3_expression_1", `= ${kTh(3, '3 + 1')}`, { ...axisStart(), x: scaleK(3, 3) + 50 }, textStyle),

        // rings
        ring("axis_1_k_1_ring_1", 10, 1.5, { ...axisStart(), x: scaleK(1, 1) + 43 }, ringStyle),
        latex("axis_1_k_1_ring_1_k", "n = 1", { ...axisStart(), x: scaleK(1, 1) + 115 }, textStyle),
        ring("axis_1_k_1_ring_2", 10, 1.5, { ...axisStart(), x: scaleK(1, 1) + 60 }, ringStyle),
        latex("axis_1_k_1_ring_2_k", "k = 1", { ...axisStart(), x: scaleK(1, 1) + 115 }, textStyle),

        ring("axis_2_k_1_ring_1", 10, 1, { ...axisStart(), x: scaleK(2, 1) + 43 }, ringStyle),
        latex("axis_2_k_1_ring_1_k", "n = 2", { ...axisStart(), x: scaleK(2, 1) + 115 }, textStyle),
        ring("axis_2_k_1_ring_2", 10, 1, { ...axisStart(), x: scaleK(2, 1) + 60 }, ringStyle),
        latex("axis_2_k_1_ring_2_k", "k = 1", { ...axisStart(), x: scaleK(2, 1) + 115 }, textStyle),
        ring("axis_2_k_2_ring_1", 10, 1, { ...axisStart(), x: scaleK(2, 2) + 43 }, ringStyle),
        latex("axis_2_k_2_ring_1_k", "n = 2", { ...axisStart(), x: scaleK(2, 2) + 115 }, textStyle),
        ring("axis_2_k_2_ring_2", 10, 1, { ...axisStart(), x: scaleK(2, 2) + 60 }, ringStyle),
        latex("axis_2_k_2_ring_2_k", "k = 2", { ...axisStart(), x: scaleK(2, 2) + 115 }, textStyle),

        ring("axis_3_k_1_ring_1", 10, 1, { ...axisStart(), x: scaleK(3, 1) + 43 }, ringStyle),
        latex("axis_3_k_1_ring_1_k", "n = 3", { ...axisStart(), x: scaleK(3, 1) + 115 }, textStyle),
        ring("axis_3_k_1_ring_2", 10, 1, { ...axisStart(), x: scaleK(3, 1) + 60 }, ringStyle),
        latex("axis_3_k_1_ring_2_k", "k = 1", { ...axisStart(), x: scaleK(3, 1) + 115 }, textStyle),
        ring("axis_3_k_2_ring_1", 10, 1, { ...axisStart(), x: scaleK(3, 2) + 43 }, ringStyle),
        latex("axis_3_k_2_ring_1_k", "n = 3", { ...axisStart(), x: scaleK(3, 2) + 115 }, textStyle),
        ring("axis_3_k_2_ring_2", 10, 1, { ...axisStart(), x: scaleK(3, 2) + 60 }, ringStyle),
        latex("axis_3_k_2_ring_2_k", "k = 2", { ...axisStart(), x: scaleK(3, 2) + 115 }, textStyle),
        ring("axis_3_k_3_ring_1", 10, 1, { ...axisStart(), x: scaleK(3, 3) + 43 }, ringStyle),
        latex("axis_3_k_3_ring_1_k", "n = 3", { ...axisStart(), x: scaleK(3, 3) + 115 }, textStyle),
        ring("axis_3_k_3_ring_2", 10, 1, { ...axisStart(), x: scaleK(3, 3) + 60 }, ringStyle),
        latex("axis_3_k_3_ring_2_k", "k = 3", { ...axisStart(), x: scaleK(3, 3) + 115 }, textStyle),

        latex("order_statistics_expression", OrderStatisticsExpression, { ...axisStart(), x: scaleK(1, 1) }, { ...textStyle, fontSize: "20px" }),
        latex("beta_distribution_expected_value_expression", BetaDistributionExpectedValueExpression, { ...axisStart(), x: scaleK(1, 1) }, { ...textStyle }),
    ],
    steps: [
        parallel([
            animate("axis_1", { position: { y: `+=${computeAxisXDistance(4, 1)}` } }, { duration: 1 }),
            animate("axis_1_start", { position: { y: `+=${computeAxisXDistance(4, 1) + 20}` } }, { duration: 1 }),
            animate("axis_1_end", { position: { y: `+=${computeAxisXDistance(4, 1) + 20}` } }, { duration: 1 }),
        ]),
        animate("axis_1_k_1", { position: { y: `+=${computeAxisXDistance(4, 1) - 35}` } }, { duration: 1 }),

        parallel([
            animate("axis_2", { position: { y: `+=${computeAxisXDistance(4, 2)}` } }, { duration: 1 }),
            animate("axis_2_start", { position: { y: `+=${computeAxisXDistance(4, 2) + 20}` } }, { duration: 1 }),
            animate("axis_2_end", { position: { y: `+=${computeAxisXDistance(4, 2) + 20}` } }, { duration: 1 }),
        ]),
        animate("axis_2_k_1", { position: { y: `+=${computeAxisXDistance(4, 2) - 35}` } }, { duration: 1 }),
        animate("axis_2_k_2", { position: { y: `+=${computeAxisXDistance(4, 2) - 35}` } }, { duration: 1 }),
        parallel([
            animate("axis_3", { position: { y: `+=${computeAxisXDistance(4, 3)}` } }, { duration: 1 }),
            animate("axis_3_start", { position: { y: `+=${computeAxisXDistance(4, 3) + 20}` } }, { duration: 1 }),
            animate("axis_3_end", { position: { y: `+=${computeAxisXDistance(4, 3) + 20}` } }, { duration: 1 }),
        ]),
        animate("axis_3_k_1", { position: { y: `+=${computeAxisXDistance(4, 3) - 35}` } }, { duration: 1 }),
        animate("axis_3_k_2", { position: { y: `+=${computeAxisXDistance(4, 3) - 35}` } }, { duration: 1 }),
        animate("axis_3_k_3", { position: { y: `+=${computeAxisXDistance(4, 3) - 35}` } }, { duration: 1 }),

        // expression
        animate("axis_1_k_1_expression_1", { position: { y: `+=${computeAxisXDistance(4, 1) - 35}` } }, { duration: 1 }),
        animate("axis_2_k_1_expression_1", { position: { y: `+=${computeAxisXDistance(4, 2) - 35}` } }, { duration: 1 }),
        animate("axis_2_k_2_expression_1", { position: { y: `+=${computeAxisXDistance(4, 2) - 35}` } }, { duration: 1 }),
        animate("axis_3_k_1_expression_1", { position: { y: `+=${computeAxisXDistance(4, 3) - 35}` } }, { duration: 1 }),
        animate("axis_3_k_2_expression_1", { position: { y: `+=${computeAxisXDistance(4, 3) - 35}` } }, { duration: 1 }),
        animate("axis_3_k_3_expression_1", { position: { y: `+=${computeAxisXDistance(4, 3) - 35}` } }, { duration: 1 }),

        // rings axis_1
        parallel([
            animate("axis_1_k_1_ring_1", { position: { y: `+=${computeAxisXDistance(4, 1) - 48}` } }, { duration: 1 }),
            animate("axis_1_k_1_ring_1_k", { position: { y: `+=${computeAxisXDistance(4, 1) - 48}` } }, { duration: 1 }),
        ]),
        parallel([
            animate("axis_1_k_1_ring_2", { position: { y: `+=${computeAxisXDistance(4, 1) - 21}` } }, { duration: 1 }),
            animate("axis_1_k_1_ring_2_k", { position: { y: `+=${computeAxisXDistance(4, 1) - 21}` } }, { duration: 1 }),
        ]),

        // rings axis_2
        parallel([
            animate("axis_2_k_1_ring_1", { position: { y: `+=${computeAxisXDistance(4, 2) - 48}` } }, { duration: 1 }),
            animate("axis_2_k_1_ring_1_k", { position: { y: `+=${computeAxisXDistance(4, 2) - 48}` } }, { duration: 1 }),
        ]),
        parallel([
            animate("axis_2_k_1_ring_2", { position: { y: `+=${computeAxisXDistance(4, 2) - 21}` } }, { duration: 1 }),
            animate("axis_2_k_1_ring_2_k", { position: { y: `+=${computeAxisXDistance(4, 2) - 21}` } }, { duration: 1 }),
        ]),

        parallel([
            animate("axis_2_k_2_ring_1", { position: { y: `+=${computeAxisXDistance(4, 2) - 48}` } }, { duration: 1 }),
            animate("axis_2_k_2_ring_1_k", { position: { y: `+=${computeAxisXDistance(4, 2) - 48}` } }, { duration: 1 }),
        ]),
        parallel([
            animate("axis_2_k_2_ring_2", { position: { y: `+=${computeAxisXDistance(4, 2) - 21}` } }, { duration: 1 }),
            animate("axis_2_k_2_ring_2_k", { position: { y: `+=${computeAxisXDistance(4, 2) - 21}` } }, { duration: 1 }),
        ]),

        // rings axis_3
        parallel([
            animate("axis_3_k_1_ring_1", { position: { y: `+=${computeAxisXDistance(4, 3) - 48}` } }, { duration: 1 }),
            animate("axis_3_k_1_ring_1_k", { position: { y: `+=${computeAxisXDistance(4, 3) - 48}` } }, { duration: 1 }),
        ]),
        parallel([
            animate("axis_3_k_1_ring_2", { position: { y: `+=${computeAxisXDistance(4, 3) - 21}` } }, { duration: 1 }),
            animate("axis_3_k_1_ring_2_k", { position: { y: `+=${computeAxisXDistance(4, 3) - 21}` } }, { duration: 1 }),
        ]),

        parallel([
            animate("axis_3_k_2_ring_1", { position: { y: `+=${computeAxisXDistance(4, 3) - 48}` } }, { duration: 1 }),
            animate("axis_3_k_2_ring_1_k", { position: { y: `+=${computeAxisXDistance(4, 3) - 48}` } }, { duration: 1 }),
        ]),
        parallel([
            animate("axis_3_k_2_ring_2", { position: { y: `+=${computeAxisXDistance(4, 3) - 21}` } }, { duration: 1 }),
            animate("axis_3_k_2_ring_2_k", { position: { y: `+=${computeAxisXDistance(4, 3) - 21}` } }, { duration: 1 }),
        ]),

        parallel([
            animate("axis_3_k_3_ring_1", { position: { y: `+=${computeAxisXDistance(4, 3) - 48}` } }, { duration: 1 }),
            animate("axis_3_k_3_ring_1_k", { position: { y: `+=${computeAxisXDistance(4, 3) - 48}` } }, { duration: 1 }),
        ]),
        parallel([
            animate("axis_3_k_3_ring_2", { position: { y: `+=${computeAxisXDistance(4, 3) - 21}` } }, { duration: 1 }),
            animate("axis_3_k_3_ring_2_k", { position: { y: `+=${computeAxisXDistance(4, 3) - 21}` } }, { duration: 1 }),
        ]),

        animate("order_statistics_expression", { position: { y: `+=${computeAxisXDistance(4, 1) + 60}` } }, { duration: 1 }),

        animate("beta_distribution_expected_value_expression", { position: { y: `+=${computeAxisXDistance(4, 4) + 60}` } }, { duration: 1 }),
    ],
};

const renderer = createDualRenderer();
const scene = new DualScene();
const camera = createOrthographicCamera();
const animationController = new AnimationController(renderer, scene, camera);

const record = render(stepScene.objects, scene as any);
let steps: PlayableStep[] = StepScenePlayer({
    objectMap: record,
    events: stepScene.steps,
    onStart: animationController.startAnimation,
    onComplete: animationController.stopAnimation
});

let index = -1;

function OrderStatisticsPageContent({
    setShowStepper,
}: {
    setShowStepper: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const navigate = useNavigate();

    const [disabled, setDisabled] = React.useState(false);

    const { containerRef } = useThreeContainer(renderer);
    useThreeAutoResize(containerRef, renderer, scene, camera);

    React.useEffect(() => {
        if (index > -1) {
            setShowStepper(false);
            return;
        }

        return () => {
            animationController.stopAnimation();
        };
    }, []);

    const onClick = async () => {
        if (index === -1) {
            setShowStepper(false);
            index = 0;
            return;
        }

        if (index === steps.length) {
            navigate('/sketches/theta/kmv');
            return;
        }

        setDisabled(true);
        await steps[index].play();


        index = index + 1;
        setDisabled(false);
    };

    return (
        <>
            <Button
                variant='contained'
                size="large"
                sx={{
                    position: 'fixed',
                    bottom: 50,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1300,
                }}
                startIcon={index === -1 ? <RocketLaunchIcon /> : index === steps.length ? <ArrowForwardIcon /> : <PlayArrowIcon />}
                onClick={onClick}
                disabled={disabled}
            >
                {index === -1 ? "Start" : index === steps.length ? "KMV" : "Next"}
            </Button>
            <div ref={containerRef} style={{ width: '100vw', height: '100vh', }} />
        </>
    );
}

export default function OrderStatisticsPage() {
    const [showStepper, setShowStepper] = React.useState(true);

    return (
        <WrapperProvider title="Order Statistics" activeStep={0} showStepper={showStepper} setShowStepper={setShowStepper}>
            <OrderStatisticsPageContent setShowStepper={setShowStepper} />
        </WrapperProvider>
    );
}
