import React from 'react';
import { WrapperProvider } from '../../components/wrapper/WrapperProvider';
import ThetaSketchOverview from './ThetaSketchOverview';
import StartButton from '../../components/StartButton';

let componentLevelShowStepper: boolean = true;

function ThetaSketchPageContent({
    showStepper,
    setShowStepper,
}: {
    showStepper: boolean;
    setShowStepper: React.Dispatch<React.SetStateAction<boolean>>;
}) {


    const handleStart = () => {
        setShowStepper(false);
        componentLevelShowStepper = false;
    }

    React.useEffect(() => {
        setShowStepper(componentLevelShowStepper);
        return () => {

        };
    }, []);
    return (
        <>
            {showStepper && <StartButton onStart={handleStart} />}
            {!showStepper && <ThetaSketchOverview />}
        </>
    );
}

export default function ThetaSketchPage() {
    const [showStepper, setShowStepper] = React.useState(true);

    return (
        <WrapperProvider title="Theta Sketch: KMV Evolution" activeStep={4} showStepper={showStepper} setShowStepper={setShowStepper}>
            <ThetaSketchPageContent showStepper={showStepper} setShowStepper={setShowStepper} />
        </WrapperProvider>
    );
}
