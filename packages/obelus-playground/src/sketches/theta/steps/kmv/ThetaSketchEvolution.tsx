import React from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';

interface ThetaSketchEvolutionProps {
    kmvEstimate: number;
    thetaSketchEstimate: number;
    accuracy: number;
    memoryUsage: number;
}

export default function ThetaSketchEvolution({ 
    kmvEstimate, 
    thetaSketchEstimate, 
    accuracy, 
    memoryUsage 
}: ThetaSketchEvolutionProps) {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Theta Sketch: KMV + Evolution
            </Typography>
            
            <Typography variant="body1" component="p">
                Theta Sketch is the modern evolution of KMV (K Minimum Value), taking the basic concept 
                and making it more intelligent and efficient.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* KMV Foundation */}
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom color="primary">
                        KMV Foundation
                    </Typography>
                    <Typography variant="body2" component="p">
                        The original KMV algorithm keeps the K smallest hash values and estimates distinct count using:
                    </Typography>
                    
                    <Box sx={{ 
                        bgcolor: 'grey.100', 
                        p: 2, 
                        borderRadius: 1, 
                        fontFamily: 'monospace',
                        fontSize: '1.1em'
                    }}>
                        Estimate = K / (K-th smallest hash value)
                    </Box>
                    
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            KMV Characteristics:
                        </Typography>
                        <ul>
                            <li><strong>Simple:</strong> Single parameter K</li>
                            <li><strong>Fixed sampling:</strong> Always keeps K values</li>
                            <li><strong>Basic accuracy:</strong> Works well for uniform data</li>
                            <li><strong>Memory usage:</strong> Fixed at K hash values</li>
                        </ul>
                    </Box>
                </Paper>

                {/* Theta Sketch Evolution */}
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom color="secondary">
                        Theta Sketch Evolution
                    </Typography>
                    <Typography variant="body2" component="p">
                        Theta Sketch adds an adaptive threshold (θ) that adjusts based on data distribution:
                    </Typography>
                    
                    <Box sx={{ 
                        bgcolor: 'grey.100', 
                        p: 2, 
                        borderRadius: 1, 
                        fontFamily: 'monospace',
                        fontSize: '1.1em'
                    }}>
                        Estimate = K / θ (where θ adapts to data)
                    </Box>
                    
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            Key Improvements:
                        </Typography>
                        <ul>
                            <li><strong>Adaptive sampling:</strong> θ adjusts to data patterns</li>
                            <li><strong>Better accuracy:</strong> Handles skewed data</li>
                            <li><strong>Memory efficient:</strong> Smarter than fixed K</li>
                            <li><strong>Industry proven:</strong> Used in production systems</li>
                        </ul>
                    </Box>
                </Paper>

                {/* Comparison */}
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        KMV vs Theta Sketch Comparison
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        <Box sx={{ flex: 1, p: 2, bgcolor: 'primary.50', borderRadius: 1 }}>
                            <Typography variant="subtitle1" gutterBottom color="primary">
                                KMV
                            </Typography>
                            <Typography variant="body2">
                                <strong>Estimate:</strong> {kmvEstimate.toFixed(2)}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Memory:</strong> Fixed K values
                            </Typography>
                            <Typography variant="body2">
                                <strong>Accuracy:</strong> Good for uniform data
                            </Typography>
                        </Box>
                        
                        <Box sx={{ flex: 1, p: 2, bgcolor: 'secondary.50', borderRadius: 1 }}>
                            <Typography variant="subtitle1" gutterBottom color="secondary">
                                Theta Sketch
                            </Typography>
                            <Typography variant="body2">
                                <strong>Estimate:</strong> {thetaSketchEstimate.toFixed(2)}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Memory:</strong> {memoryUsage}% more efficient
                            </Typography>
                            <Typography variant="body2">
                                <strong>Accuracy:</strong> {accuracy}% better
                            </Typography>
                        </Box>
                    </Box>
                </Paper>

                {/* Mathematical Foundation */}
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Mathematical Foundation
                    </Typography>
                    
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            KMV Formula:
                        </Typography>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                            E[X_k] = k/(n+1)
                        </Typography>
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            Theta Sketch Enhancement:
                        </Typography>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                            θ = adaptive threshold based on data distribution
                        </Typography>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                            Estimate = K/θ where θ adapts to data patterns
                        </Typography>
                    </Box>
                </Paper>

                {/* Evolution Timeline */}
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Algorithm Evolution Timeline
                    </Typography>
                    
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            Development Path:
                        </Typography>
                        <ol>
                            <li><strong>KMV (2003):</strong> Basic K minimum values approach</li>
                            <li><strong>HyperLogLog (2007):</strong> Logarithmic counting method</li>
                            <li><strong>LogLog (2003):</strong> Precursor to HLL</li>
                            <li><strong>Theta Sketch (2015+):</strong> Hybrid approach combining KMV + HLL ideas</li>
                        </ol>
                    </Box>
                    
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            Industry Adoption:
                        </Typography>
                        <ul>
                            <li><strong>Apache DataSketches:</strong> Production implementation</li>
                            <li><strong>Google BigQuery:</strong> Uses similar concepts</li>
                            <li><strong>Facebook:</strong> Applied in analytics</li>
                            <li><strong>Netflix:</strong> Used in recommendation systems</li>
                        </ul>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
} 