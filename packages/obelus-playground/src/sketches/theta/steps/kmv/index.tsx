import React from 'react';
import { useNavigate } from 'react-router-dom';
import { at } from 'obelus';
import { createDualRenderer, createOrthographicCamera } from '../../../../utils/threeUtils';
import { WrapperProvider } from '../../components/wrapper/WrapperProvider';
import { buildAnimateSteps, type PlayableStep } from 'obelus-gsap-player';
import { useThreeContainer } from '../../../../hooks/useThreeContainer';
import { useThreeAutoResize } from '../../../../hooks/useThreeAutoResize';
import { DualScene, textStyle, latex, type TimelineSceneThree, render, axisStyle, axis, text } from 'obelus-three-render';
import { AnimationController } from '../../../../utils/animation-controller';
import KseToKmv from './KseToKmv';
import PlayButton from '../../components/PlayButton';

const axisWidth = window.innerWidth / 2;

const buildAxis = () => {
    const start = { x: -axisWidth / 2 };
    const end = { x: axisWidth / 2 };
    const axisLine = axis("axis", start, end, { ...axisStyle, dotCount: 2 });
    const axisStart = text("axis_start", "0", { ...start, y: -15 }, textStyle);
    const axisEnd = text("axis_end", "1", { ...end, y: -15 }, textStyle);
    return [axisLine, axisStart, axisEnd];
}

const stepScene: TimelineSceneThree = {
    objects: [
        ...buildAxis(),
    ],
    timeline: [
        // at(0.1).animate('circle1', { position: { y: 200 } }, { duration: 1 }),
    ],
}

const renderer = createDualRenderer();
const camera = createOrthographicCamera();
const scene = new DualScene();
const animationController = new AnimationController(renderer, scene, camera);

const record = render(stepScene.objects, scene as any);
let steps: PlayableStep[] = buildAnimateSteps(
    [], //stepScene.steps,
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
    const [displayIntroduction, setDisplayIntroduction] = React.useState(false);

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
            setDisabled(true);
            setDisplayIntroduction(true);
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
            {displayIntroduction && <KseToKmv setDisabled={setDisabled} setDisplayIntroduction={setDisplayIntroduction} />}
            <PlayButton index={index} steps={steps} disabled={disabled} nextPage="Set Operations" onClick={onClick} />
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
