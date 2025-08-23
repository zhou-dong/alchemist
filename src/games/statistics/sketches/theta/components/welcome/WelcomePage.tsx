import { Box, Button, Stack, Typography } from '@mui/material';
import * as BarChart from '@mui/icons-material/BarChart';
import * as Psychology from '@mui/icons-material/Psychology';
import { useNavigate } from 'react-router-dom';
import { ColorModeProvider } from '../../../../../../theme/ColorModeContext';
import ThemeToggleFab from '../../../../../../theme/ThemeToggleFab';

const BarChartIcon = BarChart.default as unknown as React.ElementType;
const PsychologyIcon = Psychology.default as unknown as React.ElementType;

const WelcomePageContent = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center', // center horizontally
                alignItems: 'center',     // center vertically
                px: 2,
            }}
        >
            <Stack
                spacing={4}
                alignItems="center"
                textAlign="center"
            >
                <Typography
                    variant="h3"
                    component="h1"
                    fontWeight={700}
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                    <BarChartIcon fontSize="inherit" sx={{ color: 'primary.main' }} />
                    The Math Behind Theta Sketch
                </Typography>

                <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                    <PsychologyIcon fontSize="inherit" sx={{ color: 'secondary.main' }} />
                    The Road to Theta Sketch: A Journey Through Order Statistics, K-th Smallest Estimation, KMV, and Beyond.
                </Typography>

                <Button
                    variant="contained"
                    size="large"
                    sx={{
                        fontWeight: 600,
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        boxShadow: 3,
                    }}
                    onClick={() => navigate('/algorithms/statistics/sketches/theta/steps/order-statistics')}
                >
                    Dive In
                </Button>
            </Stack>
        </Box>
    );
}


export default function WelcomePage() {
    return (
        <ColorModeProvider>
            <WelcomePageContent />
            <ThemeToggleFab />
        </ColorModeProvider>
    );
}