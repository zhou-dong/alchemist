import React from "react";
import { Box, Card, Stack, Typography, ToggleButton, Fade, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { StepProps, Step } from "./types";
import { TreeVisualization } from "./TreeVisualization";
import { treeNodes } from "../tree";

const StyledButton = styled(ToggleButton)({
    width: "60px",
    height: "60px",
    minWidth: "60px",
    minHeight: "60px",
    borderRadius: "50%",
    textTransform: 'none',
    border: '2px solid #E0E0E0',
    '&:hover, &.Mui-focusVisible': {
        color: "#000",
        borderColor: '#4CAF50',
    },
    "&.Mui-selected": {
        backgroundColor: '#4CAF50',
        color: "#fff",
        borderColor: '#4CAF50',
        '&:hover, &.Mui-focusVisible': {
            backgroundColor: '#45A049',
            borderColor: '#45A049',
        },
    },
    fontSize: "18px",
    fontWeight: 600,
    transition: 'all 0.2s ease',
});

const TreeHeight = ({ containerRef, canvasRef, setStep }: StepProps) => {
    const [selectedAnswer, setSelectedAnswer] = React.useState<number | null>(null);
    const [showSuccess, setShowSuccess] = React.useState(false);
    const [errorIndicator, setErrorIndicator] = React.useState<number | null>(null);
    const [clickedNodeIndex, setClickedNodeIndex] = React.useState<number | null>(null);

    const correctHeight = 3; // The tree has height 3 (root -> level 1 -> level 2 -> level 3)

    const handleTreeNodeClick = (nodeIndex: number, nodeValue: string) => {
        setClickedNodeIndex(nodeIndex);
        // For tree height, clicking nodes doesn't affect the answer, just shows interaction
    };

    const handleAnswerClick = (height: number) => {
        setErrorIndicator(null);
        setSelectedAnswer(height);
        
        if (height === correctHeight) {
            setShowSuccess(true);
            setTimeout(() => setStep(Step.PREORDER_TRAVERSAL), 2000);
        } else {
            setErrorIndicator(height);
        }
    };

    return (
        <Box>
            <Stack spacing={6}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Card
                            sx={{
                                p: 4,
                                borderRadius: 3,
                                backgroundColor: 'white',
                                border: 'none',
                                boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
                                overflow: 'hidden',
                                height: '100%'
                            }}
                        >
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                color: '#222222',
                                fontWeight: 600,
                                mb: 2,
                                fontSize: '1.5rem'
                            }}
                        >
                            📏 What is the Tree Height?
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: '1.1rem',
                                lineHeight: 1.6,
                                color: '#717171',
                                mb: 3
                            }}
                        >
                            The <Box component="span" sx={{ fontWeight: 600, color: '#4CAF50' }}>height</Box> of a tree is the number of edges on the longest path from the root to a leaf.
                            Count the levels in the tree.
                        </Typography>

                        {showSuccess && (
                            <Fade in>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 3 }}>
                                    <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: 24 }} />
                                    <Typography sx={{ color: '#4CAF50', fontWeight: 600 }}>
                                        Correct! The tree height is 3.
                                    </Typography>
                                </Box>
                            </Fade>
                        )}

                        {errorIndicator !== undefined && (
                            <Fade in>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 3 }}>
                                    <ErrorIcon sx={{ color: '#F44336', fontSize: 24 }} />
                                    <Typography sx={{ color: '#F44336', fontWeight: 600 }}>
                                        Not quite! Count the levels again.
                                    </Typography>
                                </Box>
                            </Fade>
                        )}

                        <Typography
                            variant="body2"
                            sx={{
                                color: '#717171',
                                fontStyle: 'italic'
                            }}
                        >
                            Count from root (level 0) to the deepest leaf
                        </Typography>
                    </Box>

                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                        flexWrap="wrap"
                    >
                        {[1, 2, 3, 4, 5].map((height) => (
                            <StyledButton
                                key={height}
                                value={height.toString()}
                                sx={{
                                    backgroundColor: (errorIndicator === height) ? '#F44336' :
                                        (selectedAnswer === height) ? '#4CAF50' : "#fff",
                                    color: (errorIndicator === height) ? "#fff" :
                                        (selectedAnswer === height) ? "#fff" : "#000",
                                    borderColor: (errorIndicator === height) ? '#F44336' :
                                        (selectedAnswer === height) ? '#4CAF50' : '#E0E0E0',
                                }}
                                selected={selectedAnswer === height}
                                onClick={() => handleAnswerClick(height)}
                            >
                                {height}
                            </StyledButton>
                        ))}
                    </Stack>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card
                            sx={{
                                p: 4,
                                borderRadius: 3,
                                backgroundColor: 'white',
                                border: 'none',
                                boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
                                overflow: 'hidden',
                                height: '100%'
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    color: '#222222',
                                    fontWeight: 600,
                                    mb: 3,
                                    textAlign: 'center'
                                }}
                            >
                                Interactive Tree
                            </Typography>
                            
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#717171',
                                    mb: 3,
                                    textAlign: 'center'
                                }}
                            >
                                Click on nodes to explore the tree structure
                            </Typography>

                            <TreeVisualization
                                containerRef={containerRef}
                                canvasRef={canvasRef}
                                onNodeClick={handleTreeNodeClick}
                                highlightedNodes={clickedNodeIndex !== null ? [clickedNodeIndex] : []}
                                selectedNodes={[]}
                            />
                        </Card>
                    </Grid>
                </Grid>
            </Stack>
        </Box>
    );
};

export default TreeHeight;
