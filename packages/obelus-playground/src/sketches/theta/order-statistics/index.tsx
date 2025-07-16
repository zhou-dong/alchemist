import React from 'react';
import { animate, circle, line, type StepScene } from '../../../../../obelus/dist';
import type { UseThreeProps } from '../../../hooks/useThree';
import { WrapperProvider } from '../wrapper/WrapperProvider';
import { StepScenePlayer, type PlayableStep } from '../../../../../obelus-gsap-player/dist';
import { useThreeContainer } from '../../../hooks/useThreeContainer';
import { useThreeAnimation } from '../../../hooks/useThreeAnimation';
import { useThreeAutoResize } from '../../../hooks/useThreeAutoResize';
import { useRunAsyncOnce } from '../../../hooks/useRunAsyncOnce';
import { renderScene } from '../../../../../obelus-three-render/dist';
import { alignX } from '../interfaces/utils';
import { Button } from '@mui/material';

const radius = 10;

const xAxis = line("xAxis", {
    start: { x: -100, y: 0, z: 0 },
    end: { x: 100, y: 0, z: 0 },
});

const zeroCircle = circle("zero", {
    radius,
    position: { x: -100, y: 0, z: 0 },
});

const oneCircle = circle('one', {
    radius,
    position: { x: 200, y: 0, z: 0 },
});

const stepScene: StepScene = {
    objects: [
        xAxis,
        zeroCircle,
        oneCircle,
    ],
    steps: [
        animate("zero", { position: { x: 200, y: 100 } }, { duration: 1 }),
    ],
};

function OrderStatisticsPageContent({ renderer, scene, camera }: UseThreeProps) {


    const [steps, setSteps] = React.useState<PlayableStep[]>([]);
    const [disabled, setDisabled] = React.useState(false);
    const [index, setIndex] = React.useState(0);

    const { containerRef } = useThreeContainer(renderer);
    const { startAnimation, stopAnimation } = useThreeAnimation(renderer, scene, camera);
    useThreeAutoResize(containerRef, renderer, scene, camera);

    useRunAsyncOnce(async () => {
        const objectMap = await renderScene(stepScene.objects, scene);
        // alignX(objectMap);
        setSteps(
            StepScenePlayer({ objectMap, events: stepScene.steps, onStart: startAnimation, onComplete: stopAnimation })
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
