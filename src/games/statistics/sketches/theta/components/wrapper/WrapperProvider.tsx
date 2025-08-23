import { Box, Typography } from '@mui/material';
import { createContext, useContext } from 'react';
import GoToWelcome from './GoToWelcome';
import ProgressStepper from '../stepper/ProgressStepper';
import StepperToggleFab from '../stepper/ProgressStepperToggleFab';
import { ColorModeProvider } from '../../../../../../theme/ColorModeContext';
import ThemeToggleFab from '../../../../../../theme/ThemeToggleFab';

const Title = ({ title }: { title: string }) => (
    <Box sx={{
        position: 'fixed',
        top: 30,
        width: '100vw',
        textAlign: 'center',
        zIndex: 100,
    }}>
        <Typography variant="h4" gutterBottom>
            {title}
        </Typography>
    </Box>
);

type WrapperContextType = {
    activeStep: number;
    title: string;
    showStepper: boolean;
    setShowStepper: React.Dispatch<React.SetStateAction<boolean>>;
};

const WrapperContext = createContext<WrapperContextType | undefined>(undefined);

export function WrapperProvider({
    title,
    activeStep,
    children,
    showStepper,
    setShowStepper,
}: {
    title: string;
    activeStep: number;
    children: React.ReactNode;
    showStepper: boolean;
    setShowStepper: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <WrapperContext.Provider value={{ activeStep, title, showStepper, setShowStepper }}>
            <ColorModeProvider>
                {children}
                {showStepper && <ProgressStepper activeStep={activeStep} />}
                <Title title={title} />
                <GoToWelcome />
                <StepperToggleFab
                    visible={showStepper}
                    onToggle={() => setShowStepper((prev) => !prev)}
                />
                <ThemeToggleFab />
            </ColorModeProvider>
        </WrapperContext.Provider>
    );
}

export function useWrapper() {
    const context = useContext(WrapperContext);
    if (!context) {
        throw new Error('useWrapper must be used within a WrapperProvider');
    }
    return context;
}
