import React from 'react';
import { animate, parallel, } from 'obelus';
import type { UseDualRendererProps } from '../../../hooks/useThree';
import { WrapperProvider } from '../wrapper/WrapperProvider';
import { StepScenePlayer, type PlayableStep } from '../../../../../obelus-gsap-player/dist';
import { useThreeContainer } from '../../../hooks/useThreeContainer';
import { useThreeAnimation } from '../../../hooks/useThreeAnimation';
import { useThreeAutoResize } from '../../../hooks/useThreeAutoResize';
import { useRunAsyncOnce } from '../../../hooks/useRunAsyncOnce';
import { type StepSceneThree, render, axis, latex, axisStyles, textStyles, text } from 'obelus-three-render';
import { Button } from '@mui/material';

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

const kThExpresion = `\\frac{k_{\\text{th}}}{n+1}`;
const kTh = (k: number, n: string) => `\\frac{${k}}{\\text{${n}}}`;

function OrderStatisticsPageContent({ renderer, scene, camera }: UseDualRendererProps) {

    const [steps, setSteps] = React.useState<PlayableStep[]>([]);
    const [disabled, setDisabled] = React.useState(false);
    const [index, setIndex] = React.useState(0);

    const { containerRef } = useThreeContainer(renderer);
    const { startAnimation, stopAnimation } = useThreeAnimation(renderer, scene, camera);
    useThreeAutoResize(containerRef, renderer, scene, camera);

    useRunAsyncOnce(async () => {

        const stepScene: StepSceneThree = {
            objects: [
                axis("axis_1", axisStart(), axisEnd(), { ...axisStyles, dotCount: 3 }),
                text("axis_1_start", "0", scale0(), textStyles),
                text("axis_1_end", "1", scale1(), textStyles),
                latex("axis_1_k_1", "\\frac{1}{2}", { ...axisStart(), x: scaleK(1, 1) }, textStyles),


                axis("axis_2", axisStart(), axisEnd(), { ...axisStyles, dotCount: 4 }),
                text("axis_2_start", "0", scale0(), textStyles),
                text("axis_2_end", "1", scale1(), textStyles),
                latex("axis_2_k_1", "\\frac{1}{3}", { ...axisStart(), x: scaleK(2, 1) }, textStyles),
                latex("axis_2_k_2", "\\frac{2}{3}", { ...axisStart(), x: scaleK(2, 2) }, textStyles),

                axis("axis_3", axisStart(), axisEnd(), { ...axisStyles, dotCount: 5 }),
                text("axis_3_start", "0", scale0(), textStyles),
                text("axis_3_end", "1", scale1(), textStyles),
                latex("axis_3_k_1", "\\frac{1}{4}", { ...axisStart(), x: scaleK(3, 1) }, textStyles),
                latex("axis_3_k_2", "\\frac{2}{4}", { ...axisStart(), x: scaleK(3, 2) }, textStyles),
                latex("axis_3_k_3", "\\frac{3}{4}", { ...axisStart(), x: scaleK(3, 3) }, textStyles),

                // first half expression
                latex("axis_1_k_1_expression_1", `= ${kTh(1, '1 + 1')}`, { ...axisStart(), x: scaleK(1, 1) + 50 }, textStyles),
                latex("axis_2_k_1_expression_1", `= ${kTh(1, '2 + 1')}`, { ...axisStart(), x: scaleK(2, 1) + 50 }, textStyles),
                latex("axis_2_k_2_expression_1", `= ${kTh(2, '2 + 1')}`, { ...axisStart(), x: scaleK(2, 2) + 50 }, textStyles),
                latex("axis_3_k_1_expression_1", `= ${kTh(1, '3 + 1')}`, { ...axisStart(), x: scaleK(3, 1) + 50 }, textStyles),
                latex("axis_3_k_2_expression_1", `= ${kTh(2, '3 + 1')}`, { ...axisStart(), x: scaleK(3, 2) + 50 }, textStyles),
                latex("axis_3_k_3_expression_1", `= ${kTh(3, '3 + 1')}`, { ...axisStart(), x: scaleK(3, 3) + 50 }, textStyles),

                // second half expression
                latex("axis_1_k_1_expression_2", `= ${kThExpresion}`, { ...axisStart(), x: scaleK(1, 1) + 130 }, textStyles),
                latex("axis_2_k_1_expression_2", `= ${kThExpresion}`, { ...axisStart(), x: scaleK(2, 1) + 130 }, textStyles),
                latex("axis_2_k_2_expression_2", `= ${kThExpresion}`, { ...axisStart(), x: scaleK(2, 2) + 130 }, textStyles),
                latex("axis_3_k_1_expression_2", `= ${kThExpresion}`, { ...axisStart(), x: scaleK(3, 1) + 130 }, textStyles),
                latex("axis_3_k_2_expression_2", `= ${kThExpresion}`, { ...axisStart(), x: scaleK(3, 2) + 130 }, textStyles),
                latex("axis_3_k_3_expression_2", `= ${kThExpresion}`, { ...axisStart(), x: scaleK(3, 3) + 130 }, textStyles),
            ],
            steps: [
                parallel([
                    animate("axis_1", { position: { y: `+=${computeAxisXDistance(4, 1)}` } }, { duration: 1 }),
                    animate("axis_1_start", { position: { y: `+=${computeAxisXDistance(4, 1)}` } }, { duration: 1 }),
                    animate("axis_1_end", { position: { y: `+=${computeAxisXDistance(4, 1)}` } }, { duration: 1 }),
                ]),
                animate("axis_1_k_1", { position: { y: `+=${computeAxisXDistance(4, 1) - 35}` } }, { duration: 1 }),
                parallel([
                    animate("axis_2", { position: { y: `+=${computeAxisXDistance(4, 2)}` } }, { duration: 1 }),
                    animate("axis_2_start", { position: { y: `+=${computeAxisXDistance(4, 2)}` } }, { duration: 1 }),
                    animate("axis_2_end", { position: { y: `+=${computeAxisXDistance(4, 2)}` } }, { duration: 1 }),
                ]),
                animate("axis_2_k_1", { position: { y: `+=${computeAxisXDistance(4, 2) - 35}` } }, { duration: 1 }),
                animate("axis_2_k_2", { position: { y: `+=${computeAxisXDistance(4, 2) - 35}` } }, { duration: 1 }),
                parallel([
                    animate("axis_3", { position: { y: `+=${computeAxisXDistance(4, 3)}` } }, { duration: 1 }),
                    animate("axis_3_start", { position: { y: `+=${computeAxisXDistance(4, 3)}` } }, { duration: 1 }),
                    animate("axis_3_end", { position: { y: `+=${computeAxisXDistance(4, 3)}` } }, { duration: 1 }),
                ]),
                animate("axis_3_k_1", { position: { y: `+=${computeAxisXDistance(4, 3) - 35}` } }, { duration: 1 }),
                animate("axis_3_k_2", { position: { y: `+=${computeAxisXDistance(4, 3) - 35}` } }, { duration: 1 }),
                animate("axis_3_k_3", { position: { y: `+=${computeAxisXDistance(4, 3) - 35}` } }, { duration: 1 }),

                // first half expression
                animate("axis_1_k_1_expression_1", { position: { y: `+=${computeAxisXDistance(4, 1) - 35}` } }, { duration: 1 }),
                animate("axis_2_k_1_expression_1", { position: { y: `+=${computeAxisXDistance(4, 2) - 35}` } }, { duration: 1 }),
                animate("axis_2_k_2_expression_1", { position: { y: `+=${computeAxisXDistance(4, 2) - 35}` } }, { duration: 1 }),
                animate("axis_3_k_1_expression_1", { position: { y: `+=${computeAxisXDistance(4, 3) - 35}` } }, { duration: 1 }),
                animate("axis_3_k_2_expression_1", { position: { y: `+=${computeAxisXDistance(4, 3) - 35}` } }, { duration: 1 }),
                animate("axis_3_k_3_expression_1", { position: { y: `+=${computeAxisXDistance(4, 3) - 35}` } }, { duration: 1 }),

                // second half expression
                parallel([
                    animate("axis_1_k_1_expression_2", { position: { y: `+=${computeAxisXDistance(4, 1) - 35}` } }, { duration: 1 }),
                    animate("axis_2_k_1_expression_2", { position: { y: `+=${computeAxisXDistance(4, 2) - 35}` } }, { duration: 1 }),
                    animate("axis_2_k_2_expression_2", { position: { y: `+=${computeAxisXDistance(4, 2) - 35}` } }, { duration: 1 }),
                    animate("axis_3_k_1_expression_2", { position: { y: `+=${computeAxisXDistance(4, 3) - 35}` } }, { duration: 1 }),
                    animate("axis_3_k_2_expression_2", { position: { y: `+=${computeAxisXDistance(4, 3) - 35}` } }, { duration: 1 }),
                    animate("axis_3_k_3_expression_2", { position: { y: `+=${computeAxisXDistance(4, 3) - 35}` } }, { duration: 1 }),
                ]),


            ],
        };

        const record = render(stepScene.objects, scene as any);

        // console.log(record);
        // alignX(objectMap);
        setSteps(
            StepScenePlayer({ objectMap: record, events: stepScene.steps, onStart: startAnimation, onComplete: stopAnimation })
        );
    });

    const nextClick = async () => {
        setDisabled(true);
        await steps[index].play();

        if (index === steps.length - 1) return;

        setIndex(index + 1);
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
                onClick={nextClick}
                disabled={disabled}
            >
                play
            </Button>
            <div ref={containerRef} style={{ width: '100vw', height: '100vh', }} />
        </>
    );
}

export default function OrderStatisticsPage({ renderer, scene, camera }: UseDualRendererProps) {
    return (
        <WrapperProvider title="Order Statistics" activeStep={0}>
            <OrderStatisticsPageContent renderer={renderer} scene={scene} camera={camera} />
        </WrapperProvider>
    );
}