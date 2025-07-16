import { Typography, Stack } from '@mui/material';
import { useState } from 'react';
import StepperToggleFab from '../stepper/ProgressStepperToggleFab';
import ProgressStepper from '../stepper/ProgressStepper';
import GoToWelcome from '../GoToWelcome';

function OrderStatisticsPageContent() {
    const [showStepper, setShowStepper] = useState(true);

    return (
        <>
            {showStepper && <ProgressStepper activeStep={0} />}
            <Stack sx={{
                position: 'fixed',
                top: 10,
                display: 'flex',
                justifyContent: 'center', // center horizontally
                alignItems: 'center',     // center vertically,
                px: 2,
                py: 4,
                width: '100vw',
            }}>
                <Typography
                    variant="h4"
                    gutterBottom
                >
                    Order Statistics
                </Typography>
                <div />
            </Stack>

            <StepperToggleFab
                visible={showStepper}
                onToggle={() => setShowStepper((prev) => !prev)}
            />
        </>
    );
}

export default function OrderStatisticsPage() {
    return (
        <>
            <GoToWelcome />
            <OrderStatisticsPageContent />
        </>

    );
}
