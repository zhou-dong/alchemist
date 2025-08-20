import { Box, Typography, Paper, Stack, Container } from '@mui/material';

export default function ThetaSketchOverview() {
    return (
        <Container maxWidth="lg" sx={{ py: 4, marginTop: '100px' }}>
            <Stack spacing={6}>
                {/* Introduction */}
                <Box>
                    <Typography variant="h4" gutterBottom color="primary" fontWeight="bold" sx={{ mb: 3 }}>
                        What is Theta Sketch?
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.1rem', color: 'text.secondary' }}>
                        Theta Sketch is an <strong>evolution of KMV</strong>. It maintains the core
                        K-th Smallest Estimation principle while introducing both adaptive threshold (θ) and adaptive (K)
                        to make distinct count estimation more sophisticated and flexible.
                    </Typography>
                </Box>

                {/* KMV vs Theta Sketch */}
                <Box>
                    <Typography variant="h5" gutterBottom color="primary" fontWeight="bold" sx={{ mb: 3 }}>
                        KMV → Theta Sketch Evolution
                    </Typography>
                    <Stack direction="row" spacing={4} sx={{ flexWrap: 'wrap' }}>
                        <Box sx={{ flex: 1, minWidth: 320 }}>
                            <Paper variant="outlined" sx={{ p: 3, height: '100%', backgroundColor: 'background.paper' }}>
                                <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                                    KMV (Classic)
                                </Typography>
                                <Stack spacing={2}>
                                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                        • Hash value is double type between 0 and 1
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                        • θ = Hash
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                        • Estimate: k / θ - 1
                                    </Typography>

                                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                        • Fixed K
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                        • Full set operations (requires same K)
                                    </Typography>

                                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                        • Priority queue to keep K smallest hash values
                                    </Typography>

                                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                        • Confidence support (optional)
                                    </Typography>
                                </Stack>
                            </Paper>
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 320 }}>
                            <Paper variant="outlined" sx={{ p: 3, height: '100%', backgroundColor: 'background.paper', borderColor: 'success.main' }}>
                                <Typography variant="h6" fontWeight="bold" gutterBottom color="success.main">
                                    Theta Sketch (Evolution)
                                </Typography>
                                <Stack spacing={2}>
                                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                        • Hash value is long type (64 bits)
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                        • θ = Hash / Long.max
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                        • Estimate: k / θ - 1
                                    </Typography>

                                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                        • Adaptive K
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                        • Full set operations (no need to have same K)
                                    </Typography>

                                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                        • Keep all hash values &lt; θ in an array
                                    </Typography>

                                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                        • Confidence support
                                    </Typography>
                                </Stack>
                            </Paper>
                        </Box>
                    </Stack>
                </Box>

            </Stack>
        </Container>
    );
}
