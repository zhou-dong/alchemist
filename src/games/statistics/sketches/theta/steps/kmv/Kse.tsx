import { Box, Typography, Stack } from '@mui/material';

export default function KthSmallestEstimation() {
    return (
        <Stack spacing={4}>

            <Typography variant="body1" sx={{ lineHeight: 1.7, fontSize: '1.1rem' }}>
                The K-th Smallest Estimation is a technique for estimating the total distinct count in a data stream.
                If we want to use it in the big data world, we need to make sure it follows the requirements below.
            </Typography>

            {/* Requirements Section */}
            <Box>
                <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
                    Requirements
                </Typography>

                <Stack spacing={3}>
                    <Box>
                        <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                            1. Uniform Hash Function (0,1)
                        </Typography>
                        <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                            The hash function must produce values uniformly distributed in the range (0,1)
                            to ensure equal probability for any value in the interval.
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                            2. Sufficient Sample Size (N)
                        </Typography>
                        <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                            The number of hash values must be large enough to ensure even distribution across the interval (0,1).
                        </Typography>
                    </Box>
                </Stack>
            </Box>

            {/* Estimation Principle Section */}
            <Box>
                <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
                    Estimation Principle
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                    With a uniform hash function and sufficiently large N, we can assume the hash values are evenly distributed in the interval (0,1).
                    Based on this assumption, (K/θ - 1) provides an estimation of the total distinct count (N).
                </Typography>
            </Box>
        </Stack>
    );
};
