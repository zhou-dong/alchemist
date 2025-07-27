import React from 'react';
import { WrapperProvider } from '../../components/wrapper/WrapperProvider';
import { createDualRenderer, createOrthographicCamera } from '../../../../utils/threeUtils';
import { axis, circle, DualScene, render, text, type StepSceneThree } from 'obelus-three-render';
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

const { axisStyle, circleStyle, textStyle } = defaultTheme;

const renderer = createDualRenderer();
const camera = createOrthographicCamera();
const scene = new DualScene();
const animationController = new AnimationController(renderer, scene, camera);

let componentLevelShowStepper: boolean = true;
let componentLevelShowNextPageButton: boolean = false;

const axisWidth = window.innerWidth / 2;

function SetOperationsPageContent({
    showStepper,
    setShowStepper,
}: {
    showStepper: boolean;
    setShowStepper: React.Dispatch<React.SetStateAction<boolean>>;
}) {

    const defaultK = 20;
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
        const height = window.innerHeight / 8;

        const buildAxis = (id: string, y: number) => {
            const leftX = -axisWidth / 2;
            const rightX = axisWidth / 2;
            return [
                axis(id, { x: leftX, y }, { x: rightX, y }, { ...axisStyle, dotCount: 2 }),
                text(`${id}_start`, "0", { x: leftX, y: y - 15 }, textStyle),
                text(`${id}_end`, "1", { x: rightX, y: y - 15 }, textStyle),
            ];
        };

        const buildAxes = () => {
            return [
                buildAxis("A", height * 2),
                buildAxis("B", height),
                buildAxis("union", 0),
                buildAxis("intersection", -height),
                buildAxis("difference", -height * 2),
            ];
        };

        const buildHashes = (size: number, max: number, align: number): number[] => {
            const hashes = new Set<number>();
            while (hashes.size < size) {
                const randomInt = Math.floor(Math.random() * max);
                hashes.add(randomInt);
            }
            const sortedHashes = [...hashes].sort((a, b) => a - b);
            return sortedHashes.map((hash) => hash + align);
        };

        const hashesA = buildHashes(streamASize, axisWidth, -axisWidth / 2);
        const hashesB = buildHashes(streamBSize, axisWidth, -axisWidth / 2);

        // const hashesUnion = new Set([...hashesA, ...hashesB]);
        // const hashesIntersection = new Set([...hashesA].filter((hash) => hashesB.has(hash)));
        // const hashesDifference = new Set([...hashesA].filter((hash) => !hashesB.has(hash)));
        // 
        const circlesA = hashesA.map((hash, index) => circle(`a_circle_${index}`, 3, { x: hash, y: height * 2 }, circleStyle));
        const circlesB = hashesB.map((hash, index) => circle(`b_circle_${index}`, 3, { x: hash, y: height }, circleStyle));

        return {
            objects: [
                ...buildAxes().flat(),
                ...circlesA,
                ...circlesB,
            ],
            steps: [],
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
