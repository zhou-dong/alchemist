import React from 'react';
import { WrapperProvider } from '../../components/wrapper/WrapperProvider';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import * as RocketLaunch from '@mui/icons-material/RocketLaunch';
import { createDualRenderer, createOrthographicCamera } from '../../../../utils/threeUtils';
import { axis, DualScene, render, text, type StepSceneThree } from 'obelus-three-render';
import { defaultTheme } from 'obelus-three-render';
import { AnimationController } from '../../../../utils/animation-controller';
import { useThreeContainer } from '../../../../hooks/useThreeContainer';
import { useThreeAutoResize } from '../../../../hooks/useThreeAutoResize';
import { buildAnimateSteps, type PlayableStep } from 'obelus-gsap-player';

const RocketLaunchIcon = RocketLaunch.default as unknown as React.ElementType;

const { axisStyle, textStyle } = defaultTheme;

const renderer = createDualRenderer();
const camera = createOrthographicCamera();
const scene = new DualScene();
const animationController = new AnimationController(renderer, scene, camera);

let componentLevelShowStepper: boolean = true;

const axisWidth = window.innerWidth / 2;

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
    const height = window.innerHeight / 8;
    return [
        buildAxis("A", height * 2),
        buildAxis("B", height),
        buildAxis("union", 0),
        buildAxis("intersection", -height),
        buildAxis("difference", -height * 2),
    ];
};

const buildHashes = (size: number, max: number, align: number): number[] => {

    const buildSortedHashes = (): number[] => {
        const set = new Set<number>();
        while (set.size < size) {
            const randomInt = Math.floor(Math.random() * max);
            set.add(randomInt);
        }
        return [...set].sort((a, b) => a - b);
    }

    return buildSortedHashes().map((hash) => hash + align);
};

function SetOperationsPageContent({
    showStepper,
    setShowStepper,
}: {
    showStepper: boolean;
    setShowStepper: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const navigate = useNavigate();

    const { containerRef } = useThreeContainer(renderer);
    useThreeAutoResize(containerRef, renderer, scene, camera);

    const [steps, setSteps] = React.useState<PlayableStep[]>([]);

    React.useEffect(() => {
        setShowStepper(componentLevelShowStepper);
        return () => {
            animationController.stopAnimation();
        };
    }, []);

    const buildScene = (): StepSceneThree => {
        const axes = buildAxes();
        return {
            objects: axes.flat(),
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

    const StartButton = () => (
        <Button
            variant='contained'
            size="large"
            sx={{
                position: 'fixed',
                bottom: 100,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1300,
            }}
            startIcon={<RocketLaunchIcon />}
            onClick={() => {
                setShowStepper(false);
                componentLevelShowStepper = false;

                // build animatable steps
                buildAnimatableSteps();
            }}
        >
            Start
        </Button>
    );

    return (
        <>
            {showStepper && <StartButton />}
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
