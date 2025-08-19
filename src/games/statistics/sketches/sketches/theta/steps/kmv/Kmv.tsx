import { Box, Typography, Stack } from '@mui/material';

export default function KmvImplementation() {
    return (
        <Stack spacing={3}>
            {/* Core Concept */}
            <Typography variant="body1" sx={{ lineHeight: 1.7, fontSize: '1.1rem' }}>
                KMV is a practical <strong>implementation of the K-th Smallest Estimation</strong> principle.
                It keeps the K smallest hash values and uses the K-th smallest value to estimate
                the total distinct count in a data stream.
            </Typography>

            {/* Key Factor */}
            <Box>
                <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
                    Key Factor
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                    KMV maintains only K hash values in memory, regardless of stream size.
                </Typography>
            </Box>

            {/* Algorithm Steps */}
            <Box>
                <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
                    Algorithm Steps
                </Typography>
                <Stack spacing={1.5}>
                    <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                        1. Initialize: Keep K smallest hash values (initially empty)
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                        2. For each element: Hash to (0,1) and update K smallest values
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                        3. Result: Estimated N = K / (K-th smallest hash value)
                    </Typography>
                </Stack>
            </Box>
        </Stack>
    );
};
