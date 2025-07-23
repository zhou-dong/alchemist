import { Box, Typography, Paper, Stack, Divider, Container, Alert, AlertTitle } from '@mui/material';

export default function KmvImplementation() {
    return (
        <Container maxWidth="lg" sx={{ py: 2 }}>
            <Paper elevation={2} sx={{ p: 4, width: '100%' }}>
                <Typography variant="h5" gutterBottom align="center" color="primary" sx={{ mb: 3 }}>
                    K Minimum Value (KMV)
                </Typography>

                <Divider sx={{ mb: 4, mt: 4 }} />

                <Stack spacing={3}>
                    {/* Core Concept */}
                    <Box>
                        <Typography variant="body1" sx={{ lineHeight: 1.7, fontSize: '1.1rem' }}>
                            KMV is a practical <strong>implementation of the K-th Smallest Estimation</strong> principle.
                            It keeps the K smallest hash values and uses the K-th smallest value to estimate
                            the total distinct count in a data stream.
                        </Typography>
                    </Box>

                    {/* Algorithm Steps */}
                    <Box>
                        <Typography variant="h6" gutterBottom color="secondary" sx={{ mb: 2 }}>
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

                    {/* Key Factor */}
                    <Alert severity="info" sx={{ mb: 2 }}>
                        <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                            Key Factor: KMV maintains only K hash values in memory, regardless of stream size.
                        </Typography>
                    </Alert>
                </Stack>
            </Paper>
        </Container>
    );
} 