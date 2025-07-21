import React from 'react';
import { useNavigate } from 'react-router-dom';
import { animate, parallel, } from 'obelus';
import { createDualRenderer, createOrthographicCamera } from '../../../utils/threeUtils';
import { WrapperProvider } from '../wrapper/WrapperProvider';
import { buildPlayerSteps, type PlayableStep } from 'obelus-gsap-player';
import { useThreeContainer } from '../../../hooks/useThreeContainer';
import { useThreeAutoResize } from '../../../hooks/useThreeAutoResize';
import { DualScene, textStyle, latex, type StepSceneThree, render } from 'obelus-three-render';
import PlayButton from '../components/PlayButton';
import { AnimationController } from '../../../utils/animation-controller';
import { ORDER_STATISTICS_TO_KMV_FORMULAS } from './order-statistics-to-kmv-latex';

const latexes = ORDER_STATISTICS_TO_KMV_FORMULAS.map((formula, index) => {
    const y = 0 - window.innerHeight / 2 - 30;
    return latex(`formula_${index}`, formula, { y }, textStyle);
});

const displayLatexesSteps = latexes.map((_, index) => {
    const margin = window.innerHeight / 4;
    const lineHeight = window.innerHeight / 2 / latexes.length;
    return animate(`formula_${index}`, { position: { y: `+=${window.innerHeight - margin - (index * lineHeight)}` } }, { duration: 1 });
});

const moveLatexesToLeftSteps = latexes.map((_, index) => {
    const distance = window.innerWidth / 4;
    return animate(`formula_${index}`, { position: { x: `-=${distance}` } }, { duration: 1 });
});

const stepScene: StepSceneThree = {
    objects: [
        ...latexes,
    ],
    steps: [
        ...displayLatexesSteps,
        parallel(moveLatexesToLeftSteps),
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

function KmvPageContent(
    {
        setShowStepper,
    }: {
        setShowStepper: React.Dispatch<React.SetStateAction<boolean>>;
    }
) {
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
            navigate('/sketches/theta/theta-sketch');
            return;
        }

        setDisabled(true);
        await steps[index].play();

        index = index + 1;
        setDisabled(false);
    };

    return (
        <>
            <PlayButton index={index} steps={steps} disabled={disabled} nextPage="Theta Sketch" onClick={onClick} />
            <div ref={containerRef} style={{ width: '100vw', height: '100vh', }} />
        </>
    );
}

export default function KmvPage() {
    const [showStepper, setShowStepper] = React.useState(true);

    return (
        <WrapperProvider title="k Minimum Value (KMV)" activeStep={1} showStepper={showStepper} setShowStepper={setShowStepper}>
            <KmvPageContent setShowStepper={setShowStepper} />
        </WrapperProvider>
    );
}
