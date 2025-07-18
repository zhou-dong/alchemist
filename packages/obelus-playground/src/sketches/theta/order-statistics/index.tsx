import React from 'react';
import { animate, group, } from 'obelus';
import type { UseThreeProps } from '../../../hooks/useThree';
import { WrapperProvider } from '../wrapper/WrapperProvider';
import { StepScenePlayer, type PlayableStep } from '../../../../../obelus-gsap-player/dist';
import { useThreeContainer } from '../../../hooks/useThreeContainer';
import { useThreeAnimation } from '../../../hooks/useThreeAnimation';
import { useThreeAutoResize } from '../../../hooks/useThreeAutoResize';
import { useRunAsyncOnce } from '../../../hooks/useRunAsyncOnce';
import { type StepSceneThree, latex, line, circle, render } from 'obelus-three-render';
import { Button } from '@mui/material';
import * as THREE from 'three';

const color = "#fff";
const fontSize = "28px";

const radius = 6;

function OrderStatisticsPageContent({ renderer, scene, camera }: UseThreeProps) {

    const [steps, setSteps] = React.useState<PlayableStep[]>([]);
    const [disabled, setDisabled] = React.useState(false);
    const [index, setIndex] = React.useState(0);

    const { containerRef } = useThreeContainer(renderer);
    const { startAnimation, stopAnimation } = useThreeAnimation(renderer, scene, camera);
    useThreeAutoResize(containerRef, renderer, scene, camera);

    useRunAsyncOnce(async () => {

        const start = new (THREE as any).Vector3(-400, 0, 0);
        const end = new (THREE as any).Vector3(400, 0, 0);

        const zero = await latex('zero', '0', 15, { color, fontSize });
        const one = await latex('one', '1', 15, { color, fontSize });
        const point5 = await latex('point5', '\\frac{1}{2}', 50, { color, fontSize });

        const stepScene: StepSceneThree = {
            objects: [
                line("xAxis", [start, end], new (THREE as any).LineBasicMaterial({ color: "hotpink", linewidth: 5 })),
                zero,
                one,
                circle("point_5", new (THREE as any).CircleGeometry(radius, 32), new (THREE as any).MeshBasicMaterial({ color: "red" })),
                point5,
                group("group1", ["xAxis", "zero", "one", "point5", 'point_5'])
            ],
            steps: [
                animate("point5", { position: { y: -40 } }, { duration: 1 }),
                animate("group1", { position: { y: 400 } }, { duration: 1 }),
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