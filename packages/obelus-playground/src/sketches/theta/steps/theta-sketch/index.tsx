import React from 'react';
import { useNavigate } from 'react-router-dom';
import { animate, parallel, } from 'obelus';
import { createDualRenderer, createOrthographicCamera } from '../../../../utils/threeUtils';
import { WrapperProvider } from '../../components/wrapper/WrapperProvider';
import { buildPlayerSteps, type PlayableStep } from 'obelus-gsap-player';
import { useThreeContainer } from '../../../../hooks/useThreeContainer';
import { useThreeAutoResize } from '../../../../hooks/useThreeAutoResize';
import { DualScene, textStyle, latex, type StepSceneThree, render, axisStyle, axis, text } from 'obelus-three-render';
import PlayButton from '../../components/PlayButton';
import { AnimationController } from '../../../../utils/animation-controller';

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

let index = -1;

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
        if (index > -1) {
            setShowStepper(false);
            return;
        }

        return () => {
            animationController.stopAnimation();
        };
    }, []);

    const onClick = async () => {
        if (index === -1) {
            setShowStepper(false);
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
            <PlayButton index={index} steps={steps} disabled={disabled} nextPage="Set Operations" onClick={onClick} />
            <div ref={containerRef} style={{ width: '100vw', height: '100vh', }} />
        </>
    );
}

export default function ThetaSketchPage() {
    const [showStepper, setShowStepper] = React.useState(true);

    return (
        <WrapperProvider title="Theta Sketch" activeStep={2} showStepper={showStepper} setShowStepper={setShowStepper}>
            <ThetaSketchPageContent setShowStepper={setShowStepper} />
        </WrapperProvider>
    );
};
