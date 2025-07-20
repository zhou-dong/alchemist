import React from 'react';
import { animate, group, } from 'obelus';
import type { UseDualRendererProps } from '../../../hooks/useThree';
import { WrapperProvider } from '../wrapper/WrapperProvider';
import { StepScenePlayer, type PlayableStep } from '../../../../../obelus-gsap-player/dist';
import { useThreeContainer } from '../../../hooks/useThreeContainer';
import { useThreeAnimation } from '../../../hooks/useThreeAnimation';
import { useThreeAutoResize } from '../../../hooks/useThreeAutoResize';
import { useRunAsyncOnce } from '../../../hooks/useRunAsyncOnce';
import { type StepSceneThree, circle, render, scaleAxis as axis, scaleAxisChildren as axisChildren, latex, hotpinkAxis, defaultScaleProps } from 'obelus-three-render';
import { Button } from '@mui/material';

const color = "#ffffff";
const fontSize = "28px";


function OrderStatisticsPageContent({ renderer, scene, camera }: UseDualRendererProps) {

    const [steps, setSteps] = React.useState<PlayableStep[]>([]);
    const [disabled, setDisabled] = React.useState(false);
    const [index, setIndex] = React.useState(0);

    const { containerRef } = useThreeContainer(renderer);
    const { startAnimation, stopAnimation } = useThreeAnimation(renderer, scene, camera);
    useThreeAutoResize(containerRef, renderer, scene, camera);

    useRunAsyncOnce(async () => {

        const height = window.innerHeight / 2 - 120;


        const axis1Children = axisChildren("axis_1");

        const stepScene: StepSceneThree = {
            objects: [
                ...axis("axis_1", hotpinkAxis({ x: -400, }, { x: 400, }), defaultScaleProps({ y: -20, })),
                latex("latex_1", "\\frac{1}{2}", { x: 0, y: -35, z: 0 }, { color: "hotpink", fontSize: "20px" }),
                group("group1", [...axis1Children, "latex_1"]),
            ],
            steps: [
                animate("group1", { position: { y: 100 } }, { duration: 1 }),
            ],
        };

        const record = render(stepScene.objects, scene as any);
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

export default function OrderStatisticsPage({ renderer, scene, camera }: UseThreeProps) {
    return (
        <WrapperProvider title="Order Statistics" activeStep={0}>
            <OrderStatisticsPageContent renderer={renderer} scene={scene} camera={camera} />
        </WrapperProvider>
    );
}