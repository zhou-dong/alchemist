import React from 'react';
import * as THREE from 'three';
import { WrapperProvider } from '../../components/wrapper/WrapperProvider';
import { clearScene, createDualRenderer, createOrthographicCamera } from '../../../../utils/threeUtils';
import { animate, parallel } from 'obelus';
import { axis, circle, DualScene, line, render, text, type StepSceneThree } from 'obelus-three-render';
import { defaultTheme } from 'obelus-three-render';
import { AnimationController } from '../../../../utils/animation-controller';
import { useThreeContainer } from '../../../../hooks/useThreeContainer';
import { useThreeAutoResize } from '../../../../hooks/useThreeAutoResize';
import { buildAnimateSteps, type PlayableStep } from 'obelus-gsap-player';
import NextPageButton from '../../components/NextPageButton';
import StartButton from '../../components/StartButton';
import KmvConfigDialogComponent from './KmvConfigDialog';
import { Fab, Tooltip } from '@mui/material';
import * as Settings from '@mui/icons-material/Settings';
import PlayButton from '../../components/PlayButton';

const SettingsIcon = Settings.default as unknown as React.ElementType;

const { axisStyle, lineStyle, textStyle } = defaultTheme;

const renderer = createDualRenderer();
const camera = createOrthographicCamera();
const scene = new DualScene();
const animationController = new AnimationController(renderer, scene, camera);

let componentLevelShowStepper: boolean = true;
let componentLevelShowNextPageButton: boolean = false;

const buildAxis = (id: string, y: number, width: number) => {
    const leftX = -width / 2;
    const rightX = width / 2;
    return [
        axis(id, { x: leftX, y }, { x: rightX, y }, { ...axisStyle, dotCount: 2 }),
        text(`${id}_start`, "0", { x: leftX, y: y - 15 }, textStyle),
        text(`${id}_end`, "1", { x: rightX, y: y - 15 }, textStyle),
    ];
};

const buildThetaMarker = (id: string, x: number, y: number, value: number) => {
    return [
        line(`${id}_theta_line`, { x, y: y + 20 }, { x, y }, 2, lineStyle),
        text(`${id}_theta_sign`, 'θ', { x, y: y + 30 }, textStyle),
        text(`${id}_theta_value`, value.toFixed(2), { x, y: y - 25 }, textStyle),
    ];
};

const moveThetaMarkers = (id: string) => {
    const moveLine = animate(`${id}_theta_line`, { position: { y: `+=${window.innerHeight}` } }, { duration: 1 });
    const moveSign = animate(`${id}_theta_sign`, { position: { y: `+=${window.innerHeight}` } }, { duration: 1 });
    const moveValue = animate(`${id}_theta_value`, { position: { y: `+=${window.innerHeight}` } }, { duration: 1 });
    return parallel([moveLine, moveSign, moveValue]);
};

const green = '#4CAF50';
const yellow = '#FFEB3B';
const blue = '#2196F3';
const radius = 4;

const buildHashes = (size: number, max: number, align: number): { value: number, location: number }[] => {
    const hashes = new Set<number>();
    while (hashes.size < size) {
        const randomInt = Math.floor(Math.random() * max);
        hashes.add(randomInt);
    }
    const sortedHashes = [...hashes].sort((a, b) => a - b);
    const locations = sortedHashes.map((hash) => hash + align);
    const originalHashes = sortedHashes.map((hash) => hash / max);

    const result = [];
    for (let i = 0; i < size; i++) {
        const value = originalHashes[i];
        const location = locations[i];
        result.push({ value, location });
    }

    return result;
};

function SetOperationsPageContent({
    showStepper,
    setShowStepper,
}: {
    showStepper: boolean;
    setShowStepper: React.Dispatch<React.SetStateAction<boolean>>;
}) {

    const defaultK = 25;
    const defaultStreamASize = 60;
    const defaultStreamBSize = 80;
    const [k, setK] = React.useState(defaultK);
    const [streamASize, setStreamASize] = React.useState(defaultStreamASize);
    const [streamBSize, setStreamBSize] = React.useState(defaultStreamBSize);

    const [openKmvConfigDialog, setOpenKmvConfigDialog] = React.useState(false);
    const [showNextPageButton, setShowNextPageButton] = React.useState(false);
    const [showPlayerButton, setShowPlayerButton] = React.useState(false);

    const [index, setIndex] = React.useState(0);
    const [disabled, setDisabled] = React.useState(false);

    const { containerRef } = useThreeContainer(renderer);
    useThreeAutoResize(containerRef, renderer, scene, camera);

    const [steps, setSteps] = React.useState<PlayableStep[]>([]);

    React.useEffect(() => {
        setShowStepper(componentLevelShowStepper);
        setShowNextPageButton(componentLevelShowNextPageButton);
        return () => {
            animationController.stopAnimation();
        };
    }, []);

    const buildScene = (): StepSceneThree => {
        animationController.stopAnimation();
        clearScene(scene);

        const axisWidth = window.innerWidth / 2;
        const height = window.innerHeight / 8;

        const hashesA = buildHashes(streamASize, axisWidth, -axisWidth / 2);
        const hashesB = buildHashes(streamBSize, axisWidth, -axisWidth / 2);

        const kthHashA = hashesA[k - 1];
        const kthHashB = hashesB[k - 1];

        const smallKth = kthHashA.value < kthHashB.value ? kthHashA : kthHashB;

        const hashesACircles = hashesA.map((hash, index) => {
            const { location } = hash;
            const style = new THREE.MeshBasicMaterial({ color: green });
            return circle(`a_circle_${index}`, radius, { x: location, y: height * 2, z: 1 }, style as any);
        });

        const hashesBCircles = hashesB.map((hash, index) => {
            const { location } = hash;
            const style = new THREE.MeshBasicMaterial({ color: blue });
            return circle(`b_circle_${index}`, radius, { x: location, y: height, z: 1 }, style as any);
        });

        const kthUnionHash = () => {

            const unionHashes = [...hashesA, ...hashesB];
            const set = new Set(unionHashes.map((hash) => hash.value));
            const array = Array.from(set).sort((a, b) => a - b);

            const kthValue = array[k - 1];
            const kthIndex = unionHashes.findIndex((hash) => hash.value === kthValue);
            return { value: kthValue, location: unionHashes[kthIndex].location };
        }

        const kthUnion = kthUnionHash();

        const unionCircles = () => {
            const result: any[] = [];

            hashesA
                .filter((hash) => hash.value <= kthHashA.value)
                .map((hash, index) => {
                    const { location } = hash;
                    const style = new THREE.MeshBasicMaterial({ color: green });
                    result.push(circle(`union_a_circle_${index}`, radius, { x: location, y: height * 2, z: 1 }, style as any));
                });

            hashesB
                .filter((hash) => hash.value <= kthHashB.value)
                .map((hash, index) => {
                    const { location } = hash;
                    const style = new THREE.MeshBasicMaterial({ color: blue });
                    result.push(circle(`union_b_circle_${index}`, radius, { x: location, y: height, z: 1 }, style as any));
                });

            return result;
        }

        const moveUnionCircles = () => {
            const moveAHashes = hashesA
                .filter((hash) => hash.value <= kthHashA.value)
                .map((_, index) => animate(`union_a_circle_${index}`, { position: { y: `-=${height * 2}` } }, { duration: 1 }));

            const moveBHashes = hashesB
                .filter((hash) => hash.value <= kthHashB.value)
                .map((_, index) => animate(`union_b_circle_${index}`, { position: { y: `-=${height}` } }, { duration: 1 }));

            return [parallel(moveAHashes), parallel(moveBHashes)];
        }

        const intersectionCircles = () => {
            const result: any[] = [];

            hashesA
                .filter((hash) => hash.value <= smallKth.value)
                .map((hash, index) => {
                    const { location } = hash;
                    const style = new THREE.MeshBasicMaterial({ color: green });
                    result.push(circle(`intersection_a_circle_${index}`, radius, { x: location, y: height * 2, z: 1 }, style as any));
                });

            hashesB
                .filter((hash) => hash.value <= smallKth.value)
                .map((hash, index) => {
                    const { location } = hash;
                    const style = new THREE.MeshBasicMaterial({ color: blue });
                    result.push(circle(`intersection_b_circle_${index}`, radius, { x: location, y: height, z: 1 }, style as any));
                });

            const intersections = () => {
                const a = hashesA.filter((hash) => hash.value <= smallKth.value);
                const b = hashesB.filter((hash) => hash.value <= smallKth.value);

                const set = new Set(a.map((hash) => hash.value));
                const intersection = b.filter(item => set.has(item.value));

                intersection.map((hash, index) => {
                    const { location } = hash;
                    const style = new THREE.MeshBasicMaterial({ color: yellow });
                    result.push(circle(`intersection_theta_${index}`, radius, { x: location, y: -height - window.innerHeight, z: 1 }, style as any));
                });
            }

            intersections();

            return result;
        }

        const moveIntersectionCircles = () => {
            const moveAHashes = hashesA
                .filter((hash) => hash.value <= smallKth.value)
                .map((_, index) => animate(`intersection_a_circle_${index}`, { position: { y: `-=${height * 3 - 10}` } }, { duration: 1 }));

            const moveBHashes = hashesB
                .filter((hash) => hash.value <= smallKth.value)
                .map((_, index) => animate(`intersection_b_circle_${index}`, { position: { y: `-=${height * 2 + 10}` } }, { duration: 1 }));

            const a = hashesA.filter((hash) => hash.value <= smallKth.value);
            const b = hashesB.filter((hash) => hash.value <= smallKth.value);

            const set = new Set(a.map((hash) => hash.value));
            const intersection = b.filter(item => set.has(item.value));

            const moveIntersectionThetas = intersection.map((_, index) => {
                return animate(`intersection_theta_${index}`, { position: { y: `+=${window.innerHeight}` } }, { duration: 1 });
            });

            return [parallel(moveAHashes), parallel(moveBHashes), parallel(moveIntersectionThetas)];
        }

        const differenceCircles = () => {
            const result: any[] = [];

            hashesA
                .filter((hash) => hash.value <= smallKth.value)
                .map((hash, index) => {
                    const { location } = hash;
                    const style = new THREE.MeshBasicMaterial({ color: green });
                    result.push(circle(`difference_a_circle_${index}`, radius, { x: location, y: height * 2, z: 1 }, style as any));
                });

            hashesB
                .filter((hash) => hash.value <= smallKth.value)
                .map((hash, index) => {
                    const { location } = hash;
                    const style = new THREE.MeshBasicMaterial({ color: blue });
                    result.push(circle(`difference_b_circle_${index}`, radius, { x: location, y: height, z: 1 }, style as any));
                });

            const differences = () => {
                const a = hashesA.filter((hash) => hash.value <= smallKth.value);
                const b = hashesB.filter((hash) => hash.value <= smallKth.value);
                const set = new Set(b.map((hash) => hash.value));
                const difference = a.filter(item => !set.has(item.value));

                difference.map((hash, index) => {
                    const { location } = hash;
                    const style = new THREE.MeshBasicMaterial({ color: yellow });
                    result.push(circle(`difference_theta_${index}`, radius, { x: location, y: -height * 2 - window.innerHeight, z: 1 }, style as any));
                });
            }

            differences();

            return result;
        }

        const moveDifferenceCircles = () => {
            const moveAHashes = hashesA
                .filter((hash) => hash.value <= smallKth.value)
                .map((_, index) => animate(`difference_a_circle_${index}`, { position: { y: `-=${height * 4 - 10}` } }, { duration: 1 }));

            const moveBHashes = hashesB
                .filter((hash) => hash.value <= smallKth.value)
                .map((_, index) => animate(`difference_b_circle_${index}`, { position: { y: `-=${height * 3 + 10}` } }, { duration: 1 }));

            const a = hashesA.filter((hash) => hash.value <= smallKth.value);
            const b = hashesB.filter((hash) => hash.value <= smallKth.value);
            const set = new Set(b.map((hash) => hash.value));
            const difference = a.filter(item => !set.has(item.value));

            const moveDifferenceThetas = difference.map((_, index) => {
                return animate(`difference_theta_${index}`, { position: { y: `+=${window.innerHeight}` } }, { duration: 1 })
            });

            return [parallel(moveAHashes), parallel(moveBHashes), parallel(moveDifferenceThetas)];
        }

        return {
            objects: [
                ...buildAxis("sketch_a", height * 2, axisWidth),
                ...buildAxis("sketch_b", height, axisWidth),
                ...buildAxis("union", 0, axisWidth),
                ...buildAxis("intersection", -height, axisWidth),
                ...buildAxis("difference", -height * 2, axisWidth),
                ...buildThetaMarker("hashes_a", kthHashA.location, height * 2, kthHashA.value),
                ...buildThetaMarker("hashes_b", kthHashB.location, height, kthHashB.value),
                ...hashesACircles,
                ...hashesBCircles,
                ...unionCircles(),
                ...buildThetaMarker("union_theta", kthUnion.location, 0 - window.innerHeight, kthUnion.value),
                ...intersectionCircles(),
                ...buildThetaMarker("intersection_theta", smallKth.location, 0 - window.innerHeight - height, smallKth.value),
                ...differenceCircles(),
                ...buildThetaMarker("difference_theta", smallKth.location, 0 - window.innerHeight - height * 2, smallKth.value),
            ],
            steps: [
                ...moveUnionCircles(),
                moveThetaMarkers("union_theta"),
                moveThetaMarkers("intersection_theta"),
                ...moveIntersectionCircles(),
                moveThetaMarkers("difference_theta"),
                ...moveDifferenceCircles(),
            ],
        };
    };

    const buildAnimatableSteps = () => {
        const { objects, steps } = buildScene();
        const record = render(objects, scene as any); // render to three scene
        const animatableSteps = buildAnimateSteps(
            steps,
            record,
            animationController.startAnimation,
            animationController.stopAnimation
        );
        setSteps(animatableSteps);
    }

    const handleStart = () => {
        setShowStepper(false);
        componentLevelShowStepper = false;
        setOpenKmvConfigDialog(true);
    }

    const KmvConfigDialog = () => (
        <KmvConfigDialogComponent
            open={openKmvConfigDialog}
            onClose={() => {
                setOpenKmvConfigDialog(false);
            }}
            onStart={() => {
                buildAnimatableSteps();
                setShowPlayerButton(true);
                setIndex(0);
                setDisabled(false);
            }}
            k={k}
            streamASize={streamASize}
            streamBSize={streamBSize}
            setK={setK}
            setStreamASize={setStreamASize}
            setStreamBSize={setStreamBSize}
            defaultK={defaultK}
            defaultStreamASize={defaultStreamASize}
            defaultStreamBSize={defaultStreamBSize}
        />
    );

    const KmvSettingsToggle = () => (
        <Tooltip title={openKmvConfigDialog ? 'Close Config' : 'KMV Config'} placement="left">
            <Fab
                onClick={() => setOpenKmvConfigDialog(!openKmvConfigDialog)}
                sx={{
                    position: 'fixed',
                    bottom: 168,
                    right: 24,
                    zIndex: 1000
                }}
            >
                <SettingsIcon />
            </Fab>
        </Tooltip>
    );

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

        setIndex(index + 1);
    };

    return (
        <>
            <KmvSettingsToggle />
            <KmvConfigDialog />
            {showStepper && <StartButton onStart={handleStart} />}
            {showNextPageButton && <NextPageButton nextPagePath="/sketches/theta/theta-sketch" title="Go to Theta Sketch" />}
            {showPlayerButton && <PlayButton index={index} steps={steps} disabled={disabled} onClick={onClick} />}
            <div ref={containerRef} style={{ width: '100vw', height: '100vh', }} />
        </>
    );
};

export default function SetOperationsPage() {
    const [showStepper, setShowStepper] = React.useState(true);

    return (
        <WrapperProvider title="Set Operations" activeStep={3} showStepper={showStepper} setShowStepper={setShowStepper}>
            <SetOperationsPageContent showStepper={showStepper} setShowStepper={setShowStepper} />
        </WrapperProvider>
    );
};
