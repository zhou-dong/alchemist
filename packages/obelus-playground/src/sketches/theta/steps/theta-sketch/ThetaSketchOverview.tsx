import { Box, Typography, Paper, Stack, Divider, Container, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

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
                        Theta Sketch is an <strong>evolution of KMV</strong> that introduces adaptive threshold (θ) 
                        to make distinct count estimation more sophisticated and flexible. It maintains the core 
                        K-th Smallest Estimation principle while adding powerful set operation capabilities.
                    </Typography>
                </Box>

                {/* Adaptive Threshold */}
                <Box>
                    <Typography variant="h5" gutterBottom color="primary" fontWeight="bold" sx={{ mb: 3 }}>
                        Adaptive Threshold (θ)
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 4, color: 'text.secondary' }}>
                        The key innovation is replacing fixed K with adaptive θ that determines which hash values to keep.
                    </Typography>

                    <Paper variant="outlined" sx={{ p: 4, mb: 4, backgroundColor: 'background.paper' }}>
                        <Typography variant="h6" gutterBottom color="primary" fontWeight="medium" sx={{ mb: 2 }}>
                            θ Adaptation Algorithm
                        </Typography>
                        <List dense sx={{ py: 0 }}>
                            <ListItem sx={{ py: 1, px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <Typography variant="body1" fontWeight="bold" color="primary">1.</Typography>
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1">Start: θ = 1.0 (keep everything)</Typography>}
                                />
                            </ListItem>
                            <ListItem sx={{ py: 1, px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <Typography variant="body1" fontWeight="bold" color="primary">2.</Typography>
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1">Monitor memory usage</Typography>}
                                />
                            </ListItem>
                            <ListItem sx={{ py: 1, px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <Typography variant="body1" fontWeight="bold" color="primary">3.</Typography>
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1">When limit reached: θ_new = θ_current × (target_memory / current_memory)</Typography>}
                                />
                            </ListItem>
                            <ListItem sx={{ py: 1, px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <Typography variant="body1" fontWeight="bold" color="primary">4.</Typography>
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1">Remove all values ≥ new θ</Typography>}
                                />
                            </ListItem>
                            <ListItem sx={{ py: 1, px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <Typography variant="body1" fontWeight="bold" color="primary">5.</Typography>
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1">Repeat as stream grows</Typography>}
                                />
                            </ListItem>
                        </List>
                    </Paper>

                    <Typography variant="body1" sx={{ lineHeight: 1.7, color: 'text.secondary' }}>
                        This makes Theta Sketch <strong>memory-efficient</strong> and <strong>statistically sound</strong> 
                        across varying stream sizes.
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
                                    KMV (Base)
                                </Typography>
                                <Stack spacing={2}>
                                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                        • Fixed K parameter
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                        • Keep K smallest hash values
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                        • Constant memory usage
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                        • Full set operations (requires same K)
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
                                        • Adaptive threshold (θ)
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                        • Keep all values &lt; θ
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                        • Dynamic memory management
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                        • Full set operations (No need to have same K)
                                    </Typography>
                                </Stack>
                            </Paper>
                        </Box>
                    </Stack>
                </Box>

                {/* Key Advantages */}
                <Box>
                    <Typography variant="h5" gutterBottom color="primary" fontWeight="bold" sx={{ mb: 3 }}>
                        Key Advantages
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 4, backgroundColor: 'background.paper' }}>
                        <Stack spacing={3}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                <Typography variant="h6" color="primary" fontWeight="bold" sx={{ minWidth: 40 }}>•</Typography>
                                <Box>
                                    <Typography variant="body1" fontWeight="medium" gutterBottom>
                                        Memory Efficiency
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        Uses exactly the memory needed for optimal performance
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                <Typography variant="h6" color="primary" fontWeight="bold" sx={{ minWidth: 40 }}>•</Typography>
                                <Box>
                                    <Typography variant="body1" fontWeight="medium" gutterBottom>
                                        Accuracy
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        Adapts to data distribution for better estimates
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                <Typography variant="h6" color="primary" fontWeight="bold" sx={{ minWidth: 40 }}>•</Typography>
                                <Box>
                                    <Typography variant="body1" fontWeight="medium" gutterBottom>
                                        Scalability
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        Works for streams of any size efficiently
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                <Typography variant="h6" color="primary" fontWeight="bold" sx={{ minWidth: 40 }}>•</Typography>
                                <Box>
                                    <Typography variant="body1" fontWeight="medium" gutterBottom>
                                        Set Operations
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        Natural combination of sketches with θ alignment
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                <Typography variant="h6" color="primary" fontWeight="bold" sx={{ minWidth: 40 }}>•</Typography>
                                <Box>
                                    <Typography variant="body1" fontWeight="medium" gutterBottom>
                                        Flexibility
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        Handles varying data patterns and distributions
                                    </Typography>
                                </Box>
                            </Box>
                        </Stack>
                    </Paper>
                </Box>
            </Stack>
        </Container>
    );
} 