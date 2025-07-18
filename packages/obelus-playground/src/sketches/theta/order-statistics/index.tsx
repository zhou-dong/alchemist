import React from 'react';
import { animate, group, } from 'obelus';
import type { UseThreeProps } from '../../../hooks/useThree';
import { WrapperProvider } from '../wrapper/WrapperProvider';
import { StepScenePlayer, type PlayableStep } from '../../../../../obelus-gsap-player/dist';
import { useThreeContainer } from '../../../hooks/useThreeContainer';
import { useThreeAnimation } from '../../../hooks/useThreeAnimation';
import { useThreeAutoResize } from '../../../hooks/useThreeAutoResize';
import { useRunAsyncOnce } from '../../../hooks/useRunAsyncOnce';
import { type StepSceneThree, latex, cylinderLine, circle, render, axis, scaleAxis } from 'obelus-three-render';
import { Button } from '@mui/material';
import * as THREE from 'three';

const color = "#ffffff";
const fontSize = "28px";

const radius = 6;
const material = new THREE.MeshBasicMaterial({ color: "hotpink" }); // TODO: use material from obelus-three-render



function OrderStatisticsPageContent({ renderer, scene, camera }: UseThreeProps) {

    const [steps, setSteps] = React.useState<PlayableStep[]>([]);
    const [disabled, setDisabled] = React.useState(false);
    const [index, setIndex] = React.useState(0);

    const { containerRef } = useThreeContainer(renderer);
    const { startAnimation, stopAnimation } = useThreeAnimation(renderer, scene, camera);
    useThreeAutoResize(containerRef, renderer, scene, camera);

    useRunAsyncOnce(async () => {

        // const zero = await latex('zero', '0', 15, { color, fontSize });
        // zero.target.position.set(-400, -20, 0);
        // const one = await latex('one', '1', 15, { color, fontSize });
        // one.target.position.set(400, -20, 0);
        const point5 = await latex('point5', '\\frac{1}{2}', 50, { color, fontSize });
        point5.target.position.set(0, 0, 0);

        const stepScene: StepSceneThree = {
            objects: [
                scaleAxis("xAxis_1", {
                    position: {
                        start: { x: -400, y: 0, z: 0 },
                        end: { x: 400, y: 0, z: 0 },
                    },
                    scale: {
                        min: { value: 0, fontSize: 24, color: color, offset: { x: 0, y: 0, z: 0 }, scaleDown: 0.1, padding: 10 },
                        max: { value: 1, fontSize: 24, color: color, offset: { x: 0, y: 0, z: 0 }, scaleDown: 0.1, padding: 10 },
                    },
                    dotCount: 3,
                    lineWidth: 3,
                    lineMaterial: (new THREE.LineBasicMaterial({ color: "hotpink" }) as any),
                    dotRadius: 4,
                    dotMaterial: (new THREE.MeshBasicMaterial({ color: "hotpink" }) as any),
                }),
                // zero,
                // one,
                circle("point_5", new (THREE as any).CircleGeometry(radius, 32), new (THREE as any).MeshBasicMaterial({ color: "red" })),
                point5,
                group("group1", ["xAxis_1", "point5", 'point_5'])
            ],
            steps: [
                animate("xAxis_1", { position: { y: -40 } }, { duration: 1 }),
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