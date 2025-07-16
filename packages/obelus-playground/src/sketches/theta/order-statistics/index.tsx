import { Typography, Stack } from '@mui/material';
import ProgressStepper from '../ProgressStepper';

export default function OrderStatisticsPage() {
    return (
        <>
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
                {/* <ProgressStepper activeStep={2} /> */}
            </Stack>

        </>
    );
}