import React from 'react';
import { WrapperProvider } from '../../components/wrapper/WrapperProvider';
import { useNavigate } from 'react-router-dom';

let componentLevelShowStepper: boolean = true;

function SetOperationsPageContent({
    showStepper,
    setShowStepper,
}: {
    showStepper: boolean;
    setShowStepper: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const navigate = useNavigate();


    React.useEffect(() => {
        setShowStepper(componentLevelShowStepper);
        return () => {
            //todo: stop animation
        };
    }, []);

    return <div>Set Operations</div>;
};

export default function SetOperationsPage() {
    const [showStepper, setShowStepper] = React.useState(true);

    return (
        <WrapperProvider title="Set Operations" activeStep={3} showStepper={showStepper} setShowStepper={setShowStepper}>
            <SetOperationsPageContent showStepper={showStepper} setShowStepper={setShowStepper} />
        </WrapperProvider>
    );
};
