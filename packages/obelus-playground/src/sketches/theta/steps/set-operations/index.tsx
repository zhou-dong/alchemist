import React from 'react';
import { WrapperProvider } from '../../components/wrapper/WrapperProvider';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import * as RocketLaunch from '@mui/icons-material/RocketLaunch';
import { createDualRenderer, createOrthographicCamera } from '../../../../utils/threeUtils';
import { DualScene } from 'obelus-three-render';
import { AnimationController } from '../../../../utils/animation-controller';
import { useThreeContainer } from '../../../../hooks/useThreeContainer';
import { useThreeAutoResize } from '../../../../hooks/useThreeAutoResize';

const RocketLaunchIcon = RocketLaunch.default as unknown as React.ElementType;

const renderer = createDualRenderer();
const camera = createOrthographicCamera();
const scene = new DualScene();
const animationController = new AnimationController(renderer, scene, camera);

let componentLevelShowStepper: boolean = true;

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

    React.useEffect(() => {
        setShowStepper(componentLevelShowStepper);
        return () => {
            //todo: stop animation
        };
    }, []);

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
