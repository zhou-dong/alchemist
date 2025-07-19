import React from 'react';
import { animate, group, } from 'obelus';
import type { UseDualRendererProps } from '../../../hooks/useThree';
import { WrapperProvider } from '../wrapper/WrapperProvider';
import { StepScenePlayer, type PlayableStep } from '../../../../../obelus-gsap-player/dist';
import { useThreeContainer } from '../../../hooks/useThreeContainer';
import { useThreeAnimation } from '../../../hooks/useThreeAnimation';
import { useThreeAutoResize } from '../../../hooks/useThreeAutoResize';
import { useRunAsyncOnce } from '../../../hooks/useRunAsyncOnce';
import { type StepSceneThree, circle, render, scaleAxis as axis, scaleAxisChildren as axisChildren, latex } from 'obelus-three-render';
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

        // const zero = await latex('zero', '0', 15, { color, fontSize });
        // zero.target.position.set(-400, -20, 0);
        // const one = await latex('one', '1', 15, { color, fontSize });
        // one.target.position.set(400, -20, 0);
        const point5 = await latex('point5', '\\frac{1}{2}', 50, { color, fontSize });
        point5.target.position.set(0, 0, 0);

        // create a virsual group (axis and scale into one group)
        const axis1Children = axisChildren("axis_1");
        const axis2Children = axisChildren("axis_2");
        const axis3Children = axisChildren("axis_3");
        const axis4Children = axisChildren("axis_4");
        const axis5Children = axisChildren("axis_5");

        const stepScene: StepSceneThree = {
            objects: [
                ...axis("axis_1", { startX: -400, endX: 400, startY: 0, endY: 0, }),
                ...axis("axis_2", { startX: -400, endX: 400, startY: 0 - 100, endY: 0 - 100, }),
                ...axis("axis_3", { startX: -400, endX: 400, startY: 0 - 200, endY: 0 - 200, }),
                ...axis("axis_4", { startX: -400, endX: 400, startY: 0 - 300, endY: 0 - 300, }),
                ...axis("axis_5", { startX: -400, endX: 400, startY: 0 - 400, endY: 0 - 400, }),
                latex("latex_1", "\\frac{1}{3}", { color: "red", fontSize: "28px" }),
                group("group1", [...axis1Children, ...axis2Children, ...axis3Children, ...axis4Children, ...axis5Children])
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