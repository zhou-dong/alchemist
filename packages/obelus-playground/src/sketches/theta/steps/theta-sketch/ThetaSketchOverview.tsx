import { Box, Typography, Paper, Stack, Divider, Container, Alert, AlertTitle } from '@mui/material';

export default function ThetaSketchOverview() {
    return (
        <Container maxWidth="lg" sx={{ py: 2 }}>
            <Paper elevation={2} sx={{ p: 4, width: '100%' }}>
                <Typography variant="h4" gutterBottom align="center" color="primary" sx={{ mb: 3 }}>
                    Theta Sketch: KMV Evolution
                </Typography>

                <Stack spacing={4}>
                    {/* Introduction */}
                    <Box>
                        <Typography variant="h6" gutterBottom color="secondary">
                            What is Theta Sketch?
                        </Typography>
                        <Typography variant="body1" sx={{ lineHeight: 1.7, fontSize: '1.1rem' }}>
                            Theta Sketch is an <strong>evolution of KMV</strong> that introduces adaptive threshold (θ) 
                            to make distinct count estimation more sophisticated and flexible. It maintains the core 
                            K-th Smallest Estimation principle while adding powerful set operation capabilities.
                        </Typography>
                    </Box>

                    <Divider />

                    {/* KMV vs Theta Sketch */}
                    <Box>
                        <Typography variant="h6" gutterBottom color="secondary">
                            KMV → Theta Sketch Evolution
                        </Typography>
                        <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap' }}>
                            <Box sx={{ flex: 1, minWidth: 300 }}>
                                <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
                                    <Typography variant="h6" gutterBottom color="primary">
                                        KMV (Base)
                                    </Typography>
                                    <Stack spacing={2}>
                                        <Typography variant="body2">
                                            • Fixed K parameter
                                        </Typography>
                                        <Typography variant="body2">
                                            • Keep K smallest hash values
                                        </Typography>
                                        <Typography variant="body2">
                                            • Constant memory usage
                                        </Typography>
                                        <Typography variant="body2">
                                            • Limited set operations
                                        </Typography>
                                    </Stack>
                                </Paper>
                            </Box>
                            <Box sx={{ flex: 1, minWidth: 300 }}>
                                <Paper variant="outlined" sx={{ p: 3, height: '100%', borderColor: 'success.main' }}>
                                    <Typography variant="h6" gutterBottom color="success.main">
                                        Theta Sketch (Evolution)
                                    </Typography>
                                    <Stack spacing={2}>
                                        <Typography variant="body2">
                                            • Adaptive threshold (θ)
                                        </Typography>
                                        <Typography variant="body2">
                                            • Keep all values &lt; θ
                                        </Typography>
                                        <Typography variant="body2">
                                            • Dynamic memory management
                                        </Typography>
                                        <Typography variant="body2">
                                            • Full set operations
                                        </Typography>
                                    </Stack>
                                </Paper>
                            </Box>
                        </Stack>
                    </Box>

                    <Divider />

                    {/* Adaptive Threshold */}
                    <Box>
                        <Typography variant="h6" gutterBottom color="secondary">
                            Adaptive Threshold (θ)
                        </Typography>
                        <Typography variant="body1" sx={{ lineHeight: 1.6, mb: 2 }}>
                            The key innovation is replacing fixed K with adaptive θ that determines which hash values to keep.
                        </Typography>
                        
                        <Alert severity="info" sx={{ mb: 3 }}>
                            <AlertTitle>θ Adaptation Algorithm</AlertTitle>
                            <Typography variant="body2">
                                1. Start: θ = 1.0 (keep everything)
                                2. Monitor memory usage
                                3. When limit reached: θ_new = θ_current × (target_memory / current_memory)
                                4. Remove all values ≥ new θ
                                5. Repeat as stream grows
                            </Typography>
                        </Alert>

                        <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                            This makes Theta Sketch <strong>memory-efficient</strong> and <strong>statistically sound</strong> 
                            across varying stream sizes.
                        </Typography>
                    </Box>

                    <Divider />

                    {/* Set Operations */}
                    <Box>
                        <Typography variant="h6" gutterBottom color="secondary">
                            Set Operations
                        </Typography>
                        <Typography variant="body1" sx={{ lineHeight: 1.6, mb: 2 }}>
                            Theta Sketch enables natural set operations through θ alignment, while KMV requires same K values.
                        </Typography>

                        <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap' }}>
                            <Box sx={{ flex: 1, minWidth: 250 }}>
                                <Paper variant="outlined" sx={{ p: 2 }}>
                                    <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                                        Union
                                    </Typography>
                                    <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                                        θ = min(θ_A, θ_B)
                                        <br />
                                        Merge and re-apply θ
                                    </Typography>
                                </Paper>
                            </Box>
                            <Box sx={{ flex: 1, minWidth: 250 }}>
                                <Paper variant="outlined" sx={{ p: 2 }}>
                                    <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                                        Intersection
                                    </Typography>
                                    <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                                        θ = min(θ_A, θ_B)
                                        <br />
                                        Find common values
                                    </Typography>
                                </Paper>
                            </Box>
                            <Box sx={{ flex: 1, minWidth: 250 }}>
                                <Paper variant="outlined" sx={{ p: 2 }}>
                                    <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                                        Difference
                                    </Typography>
                                    <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                                        θ = min(θ_A, θ_B)
                                        <br />
                                        A - B computation
                                    </Typography>
                                </Paper>
                            </Box>
                        </Stack>
                    </Box>

                    <Divider />

                    {/* Key Advantages */}
                    <Box>
                        <Typography variant="h6" gutterBottom color="secondary">
                            Key Advantages
                        </Typography>
                        <Stack spacing={2}>
                            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                                • <strong>Memory Efficiency:</strong> Uses exactly the memory needed
                            </Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                                • <strong>Accuracy:</strong> Adapts to data distribution
                            </Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                                • <strong>Scalability:</strong> Works for streams of any size
                            </Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                                • <strong>Set Operations:</strong> Natural combination of sketches
                            </Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                                • <strong>Flexibility:</strong> Handles varying data patterns
                            </Typography>
                        </Stack>
                    </Box>
                </Stack>
            </Paper>
        </Container>
    );
} 