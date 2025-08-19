import { Stepper, Step, StepLabel, Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const Location = styled(Box)(({ }) => ({
    position: 'fixed',
    top: 100, // adjust depending on header height
    left: 0,
    right: 0,
    zIndex: 1100,
    px: 4,
    py: 2,
}));

const steps = [
    'Order Statistics',
    'K-th Smallest Estimation',
    'K Minimum Value',
    'Set Operations',
    'Theta Sketch',
];

export default function ProgressStepper({ activeStep }: { activeStep: number }) {
    return (
        <Location>
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
        </Location>
    );
};
