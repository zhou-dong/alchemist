import { Box, Typography } from '@mui/material';
import { createContext, useState } from 'react';
import GoToWelcome from '../welcome/GoToWelcome';
import ProgressStepper from '../stepper/ProgressStepper';
import StepperToggleFab from '../stepper/ProgressStepperToggleFab';

const Title = ({ title }: { title: string }) => (
    <Box sx={{
        position: 'fixed',
        top: 30,
        width: '100vw',
        textAlign: 'center',
    }}>
        <Typography variant="h4" gutterBottom>
            {title}
        </Typography>
    </Box>
);

type WrapperContextType = {
    activeStep: number;
    title: string;
};

const WrapperContext = createContext<WrapperContextType | undefined>(undefined);

export function WrapperProvider({
    title,
    activeStep,
    children,
}: {
    title: string;
    activeStep: number;
    children: React.ReactNode;
}) {
    const [showStepper, setShowStepper] = useState(true);

    return (
        <WrapperContext.Provider value={{ activeStep, title }}>
            {children}
            {showStepper && <ProgressStepper activeStep={activeStep} />}
            <Title title={title} />
            <GoToWelcome />
            <StepperToggleFab
                visible={showStepper}
                onToggle={() => setShowStepper((prev) => !prev)}
            />
        </WrapperContext.Provider>
    );
}
