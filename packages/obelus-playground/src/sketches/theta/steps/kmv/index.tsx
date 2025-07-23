import React from 'react';
import { useNavigate } from 'react-router-dom';
import { animate, parallel, } from 'obelus';
import { createDualRenderer, createOrthographicCamera } from '../../../../utils/threeUtils';
import { WrapperProvider } from '../../components/wrapper/WrapperProvider';
import { buildPlayerSteps, type PlayableStep } from 'obelus-gsap-player';
import { useThreeContainer } from '../../../../hooks/useThreeContainer';
import { useThreeAutoResize } from '../../../../hooks/useThreeAutoResize';
import { DualScene, textStyle, latex, type StepSceneThree, render, axisStyle, axis, text } from 'obelus-three-render';
import { AnimationController } from '../../../../utils/animation-controller';
import { Button } from '@mui/material';
import KstToKmv from './KstToKmv';
import * as PlayArrow from '@mui/icons-material/PlayArrow';
import * as ArrowForward from '@mui/icons-material/ArrowForward';
import * as RocketLaunch from '@mui/icons-material/RocketLaunch';
import * as TipsAndUpdates from '@mui/icons-material/TipsAndUpdates';

const PlayArrowIcon = PlayArrow.default as unknown as React.ElementType;
const ArrowForwardIcon = ArrowForward.default as unknown as React.ElementType;
const RocketLaunchIcon = RocketLaunch.default as unknown as React.ElementType;
const TipsAndUpdatesIcon = TipsAndUpdates.default as unknown as React.ElementType;

const stepScene: StepSceneThree = {
    objects: [

    ],
    steps: [

    ],
}

const renderer = createDualRenderer();
const camera = createOrthographicCamera();
const scene = new DualScene();
const animationController = new AnimationController(renderer, scene, camera);

const record = render(stepScene.objects, scene as any);
let steps: PlayableStep[] = buildPlayerSteps(
    stepScene.steps,
    record,
    animationController.startAnimation,
    animationController.stopAnimation
);

let index = -2;

function ThetaSketchPageContent({
    setShowStepper,
}: {
    setShowStepper: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const navigate = useNavigate();
    const [disabled, setDisabled] = React.useState(false);

    const { containerRef } = useThreeContainer(renderer);
    useThreeAutoResize(containerRef, renderer, scene, camera);

    React.useEffect(() => {
        if (index > -2) {
            setShowStepper(false);
            return;
        }

        return () => {
            animationController.stopAnimation();
        };
    }, []);

    const onClick = async () => {
        if (index === -2) {
            setShowStepper(false);
            index = -1;
            setDisabled(true);
            return;
        }

        if (index === -1) {
            index = 0;
            return;
        }

        if (index === steps.length) {
            navigate('/sketches/theta/set-operations');
            return;
        }

        setDisabled(true);
        await steps[index].play();

        index = index + 1;
        setDisabled(false);
    };

    return (
        <>

            {index === -1 && <KstToKmv setDisabled={setDisabled} />}

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
                startIcon={
                    index === -2 ? <TipsAndUpdatesIcon /> :
                        index === -1 ? <RocketLaunchIcon /> :
                            index === steps.length ? <ArrowForwardIcon /> :
                                <PlayArrowIcon />
                }
                onClick={onClick}
                disabled={disabled}
            >
                {
                    index === -2 ? "KST -> KMV" :
                        index === -1 ? "Start" :
                            index === steps.length ? "Set Operations" :
                                "Next"
                }
            </Button>
            <div ref={containerRef} style={{ width: '100vw', height: '100vh', }} />
        </>
    );
}

export default function ThetaSketchPage() {
    const [showStepper, setShowStepper] = React.useState(true);

    return (
        <WrapperProvider title="K Minimum Value (KMV)" activeStep={2} showStepper={showStepper} setShowStepper={setShowStepper}>
            <ThetaSketchPageContent setShowStepper={setShowStepper} />
        </WrapperProvider>
    );
};
