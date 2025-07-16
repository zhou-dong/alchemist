import { Stepper, Step, StepLabel, Container } from '@mui/material';

const steps = [
    'Order Statistics',
    'KMV',
    'Theta Sketch',
    'Set Operations',
];

export default function ProgressStepper({ activeStep }: { activeStep: number }) {
    return (
        <Container>
            <Stepper
                activeStep={activeStep}
                sx={{
                    '& .MuiStepIcon-root': {
                        fontSize: 50,
                    },
                    '& .MuiStepLabel-label': {
                        fontSize: '1rem',
                    },
                }}
            >
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Container>
    );
};
