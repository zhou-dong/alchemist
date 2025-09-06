import React from "react";
import { Box, Card, Stack, Typography, ToggleButton, Fade, Button, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { StepProps, Step } from "./types";
import { Basics } from "./components";
import { TreeVisualization } from "./TreeVisualization";
import { StepsIndicator } from "./StepsIndicator";
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

const PreorderTraversal = ({ containerRef, canvasRef, setStep }: StepProps) => {
    const [selectedOrder, setSelectedOrder] = React.useState<number[]>([]);
    const [showSuccess, setShowSuccess] = React.useState(false);
    const [completed, setCompleted] = React.useState(false);
    const [clickedNodeIndex, setClickedNodeIndex] = React.useState<number | null>(null);

    // Preorder traversal: Root, Left, Right
    const correctPreorder = [0, 1, 3, 4, 2, 5]; // 1, 2, 4, 5, 3, 6

    const handleTreeNodeClick = (nodeIndex: number, nodeValue: string) => {
        setClickedNodeIndex(nodeIndex);
        handleNodeClick(nodeIndex);
    };

    const handleNodeClick = (i: number) => {
        if (completed) return;
        
        if (!selectedOrder.includes(i)) {
            const newOrder = [...selectedOrder, i];
            setSelectedOrder(newOrder);
            
            // Check if the order matches preorder traversal
            if (newOrder.length === correctPreorder.length) {
                const isCorrect = newOrder.every((node, index) => node === correctPreorder[index]);
                if (isCorrect) {
                    setShowSuccess(true);
                    setCompleted(true);
                    setTimeout(() => setStep(Step.INORDER_TRAVERSAL), 2000);
                }
            }
        }
    };

    const resetOrder = () => {
        setSelectedOrder([]);
        setShowSuccess(false);
        setCompleted(false);
    };

    return (
        <Box>
            <Stack spacing={6}>
                <Basics currentStep={Step.PREORDER_TRAVERSAL} />
                <StepsIndicator currentStep={Step.PREORDER_TRAVERSAL} />

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
                            🔄 Preorder Traversal
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
                            <Box component="span" sx={{ fontWeight: 600, color: '#4CAF50' }}>Preorder traversal</Box> visits nodes in this order:
                            <br />1. Visit the root
                            <br />2. Traverse the left subtree
                            <br />3. Traverse the right subtree
                        </Typography>

                        {showSuccess && (
                            <Fade in>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 3 }}>
                                    <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: 24 }} />
                                    <Typography sx={{ color: '#4CAF50', fontWeight: 600 }}>
                                        Excellent! You completed the preorder traversal.
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
                            Click nodes in the correct preorder sequence
                        </Typography>
                    </Box>

                    <Stack spacing={3}>
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', color: '#222222' }}>
                                Current Order: {selectedOrder.map(i => treeNodes[i]?.text).join(' → ')}
                            </Typography>
                            
                            <Stack
                                direction="row"
                                spacing={2}
                                justifyContent="center"
                                flexWrap="wrap"
                            >
                                {treeNodes
                                    .filter(node => node !== null)
                                    .map((node, i) => (
                                        <StyledButton
                                            key={i}
                                            value={node?.value}
                                            sx={{
                                                backgroundColor: selectedOrder.includes(i) ? '#4CAF50' : "#fff",
                                                color: selectedOrder.includes(i) ? "#fff" : "#000",
                                                borderColor: selectedOrder.includes(i) ? '#4CAF50' : '#E0E0E0',
                                            }}
                                            selected={selectedOrder.includes(i)}
                                            onClick={() => handleNodeClick(i)}
                                            disabled={completed}
                                        >
                                            {node?.text}
                                        </StyledButton>
                                    ))}
                            </Stack>
                        </Box>

                        {completed && (
                            <Fade in>
                                <Box sx={{ textAlign: 'center', mt: 4 }}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={resetOrder}
                                        sx={{
                                            backgroundColor: '#4CAF50',
                                            color: 'white',
                                            px: 4,
                                            py: 2,
                                            borderRadius: 2,
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                            textTransform: 'none',
                                            '&:hover': {
                                                backgroundColor: '#45A049',
                                            },
                                        }}
                                    >
                                        Try Again
                                    </Button>
                                </Box>
                            </Fade>
                        )}
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
                                Click on nodes in preorder sequence (Root, Left, Right)
                            </Typography>

                            <TreeVisualization
                                containerRef={containerRef}
                                canvasRef={canvasRef}
                                onNodeClick={handleTreeNodeClick}
                                highlightedNodes={clickedNodeIndex !== null ? [clickedNodeIndex] : []}
                                selectedNodes={selectedOrder}
                                showLabels={true}
                            />
                        </Card>
                    </Grid>
                </Grid>
            </Stack>
        </Box>
    );
};

export default PreorderTraversal;
