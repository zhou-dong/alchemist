import React from 'react';
import { animate, circle, group, latex, line, type StepScene } from '../../../../../obelus/dist';
import type { UseThreeProps } from '../../../hooks/useThree';
import { WrapperProvider } from '../wrapper/WrapperProvider';
import { StepScenePlayer, type PlayableStep } from '../../../../../obelus-gsap-player/dist';
import { useThreeContainer } from '../../../hooks/useThreeContainer';
import { useThreeAnimation } from '../../../hooks/useThreeAnimation';
import { useThreeAutoResize } from '../../../hooks/useThreeAutoResize';
import { useRunAsyncOnce } from '../../../hooks/useRunAsyncOnce';
import { renderScene } from '../../../../../obelus-three-render/dist';
import { Button } from '@mui/material';

const color = "#fff";
const fontSize = "28px";

const radius = 6;

const xAxis = line("xAxis", {
    start: { x: -400, y: 0, z: 0 },
    end: { x: 400, y: 0, z: 0 },
});

const pointCircle5 = circle("point_5", {
    radius,
    position: { x: 0, y: 0, z: 0 },
});

const zero = latex('zero', {
    expression: '0',
    position: { x: -400, y: -15, z: 0 },
    extra: {
        style: { color, fontSize },
        height: 15,
    }
});

const one = latex('one', {
    expression: '1',
    position: { x: 400, y: -15, z: 0 },
    extra: {
        style: { color, fontSize },
        height: 15,
    }
});

const point5 = latex('point5', {
    expression: '\\frac{1}{2}',
    position: { x: 0, y: -800, z: 0 },
    extra: {
        style: { color, fontSize },
        height: 40,
    }
});

const stepScene: StepScene = {
    objects: [
        xAxis,
        zero,
        one,
        pointCircle5,
        point5,
        group("group1", ["xAxis", "zero", "one", "point5", 'point_5'])
    ],
    steps: [
        animate("point5", { position: { y: -40 } }, { duration: 1 }),
        animate("group1", { position: { y: 400 } }, { duration: 1 }),
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
