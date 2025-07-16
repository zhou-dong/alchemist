// ProgressStepperWrapper.tsx
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import ProgressStepper from './ProgressStepper';

const stepMap: Record<string, number> = {
    '/sketches/theta/order-statistics': 0,
    '/sketches/theta/kmv': 1,
    '/sketches/theta/theta': 2,
    '/sketches/theta/set-operations': 3,
};

export default function ProgressStepperWrapper() {
    const location = useLocation();
    const activeStep = stepMap[location.pathname] ?? -1;

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 100, // adjust depending on header height
                left: 0,
                right: 0,
                zIndex: 1100,
                px: 4,
                py: 2,
            }}
        >
            <ProgressStepper activeStep={activeStep} />
        </Box>
    );
};
