import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, BottomNavigation, BottomNavigationAction, Container, Divider, Paper } from '@mui/material';
import KthSmallestEstimation from './Kse';
import KmvImplementation from './Kmv';

import * as Functions from '@mui/icons-material/Functions';
import * as Storage from '@mui/icons-material/Storage';
import * as Settings from '@mui/icons-material/Settings';

const FunctionsIcon = Functions.default as unknown as React.ElementType;
const StorageIcon = Storage.default as unknown as React.ElementType;
const SettingsIcon = Settings.default as unknown as React.ElementType;

const FloatingBox = styled(Box)({
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    width: '100%',
});

const Navigation = ({
    currentIndex,
    setCurrentIndex
}: {
    currentIndex: number,
    setCurrentIndex: (index: number) => void
}) => {
    return (
        <BottomNavigation
            value={currentIndex}
            onChange={(_, newValue) => {
                setCurrentIndex(newValue);
            }}
            sx={{
                backgroundColor: "transparent",
                zIndex: 1000,
            }}
        >
            <BottomNavigationAction
                label="KST"
                value={0}
                icon={<FunctionsIcon />}
            />
            <BottomNavigationAction
                label="KMV"
                value={1}
                icon={<StorageIcon />}
            />
            <BottomNavigationAction
                label="Start"
                value={2}
                icon={<SettingsIcon />}
            />
        </BottomNavigation>
    );
};

export default function KstToKmv({ onClose }: { onClose: () => void }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex === 2) {
            onClose();
        }
    }, [currentIndex]);

    return (
        <FloatingBox>

            <Container maxWidth="lg" sx={{ py: 2 }}>
                <Paper elevation={2} sx={{ p: 2 }}>

                    <Typography variant='h6' align="center" sx={{ mb: 3 }}>
                        From <Typography variant='h6' component="span" color={currentIndex === 0 ? "primary" : "text.primary"}>K-th Smallest Estimation</Typography> to <Typography variant='h6' component="span" color={currentIndex === 1 ? "primary" : "text.primary"}>K Minimum Value</Typography>
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    {currentIndex === 0 && <KthSmallestEstimation />}
                    {currentIndex === 1 && <KmvImplementation />}

                    <Divider sx={{ my: 2 }} />

                    <Navigation currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
                </Paper>
            </Container>
        </FloatingBox>
    );
}
