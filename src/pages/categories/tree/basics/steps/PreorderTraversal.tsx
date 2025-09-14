import React from "react";
import { Box, Stack, Typography, Fade, Grid, Button } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { StepProps, Step } from "./types";
import { TreeVisualization } from "./TreeVisualization";
import { treeNodes } from "../tree";

const SuccessMessage: React.FC<{ showSuccess: boolean }> = ({ showSuccess }) => (
    <Fade
        in={showSuccess}
        timeout={{ enter: 600, exit: 300 }}
        easing={{ enter: 'cubic-bezier(0.34, 1.56, 0.64, 1)', exit: 'ease-in' }}
    >
        <Box sx={{
            position: 'fixed',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -20%)',
            backgroundColor: '#E8F5E8',
            border: '2px solid #4CAF50',
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
            zIndex: 1000,
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            minWidth: '300px'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
                <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: 32 }} />
                <Typography variant="h5" sx={{ color: '#4CAF50', fontWeight: 600 }}>
                    🎉 Excellent Work!
                </Typography>
            </Box>
            <Typography sx={{ color: '#4CAF50', fontWeight: 500 }}>
                You completed the preorder traversal correctly!
            </Typography>
        </Box>
    </Fade>
);

const ErrorMessage: React.FC<{ showError: boolean }> = ({ showError }) => (
    <Fade
        in={showError}
        timeout={{ enter: 300, exit: 200 }}
        easing={{ enter: 'ease-out', exit: 'ease-in' }}
    >
        <Box sx={{
            position: 'fixed',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -20%)',
            backgroundColor: '#FFEBEE',
            border: '2px solid #F44336',
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
            zIndex: 1000,
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            minWidth: '300px'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
                <ErrorIcon sx={{ color: '#F44336', fontSize: 32 }} />
                <Typography variant="h5" sx={{ color: '#F44336', fontWeight: 600 }}>
                    ❌ Try Again!
                </Typography>
            </Box>
            <Typography sx={{ color: '#F44336', fontWeight: 500 }}>
                That's not the correct preorder sequence. Try again!
            </Typography>
        </Box>
    </Fade>
);

const SubTitle = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Typography
            variant="h2"
            sx={{
                color: '#222222',
                fontWeight: 600,
                fontSize: { xs: '2rem', md: '2.5rem' },
                lineHeight: 1.1,
                letterSpacing: '-0.02em'
            }}
        >
            🔄 Preorder Traversal
        </Typography>
    </Box>
);

const MissionObjective = () => (
    <Box sx={{
        border: '1px solid #4CAF50',
        borderRadius: 2,
        p: 3,
        mb: 4
    }}>
        <Stack direction="row" spacing={1} display="flex" alignItems="center" sx={{ mb: 2 }}>
            <SportsEsportsIcon color="primary" fontSize="large" />
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}
            >
                Mission Objective
            </Typography>
        </Stack>
        <Typography
            variant="body1"
            sx={{
                color: '#222222',
                fontWeight: 400,
                fontSize: '1rem',
                lineHeight: 1.6
            }}
        >
            <Box component="span" sx={{ fontWeight: 600, color: '#4CAF50' }}>Preorder traversal</Box> visits nodes in this order:
            <br />1. Visit the root
            <br />2. Traverse the left subtree
            <br />3. Traverse the right subtree
        </Typography>
    </Box>
);

const Hint = () => (
    <Box sx={{
        backgroundColor: '#F5F5F5',
        borderRadius: 2,
        p: 3,
        mb: 4,
        border: '1px solid #E0E0E0'
    }}>
        <Stack direction="row" spacing={1} display="flex" alignItems="center" sx={{ mb: 2 }}>
            <TipsAndUpdatesIcon color="warning" fontSize="large" />
            <Typography variant="h6" sx={{
                color: '#222222',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center'
            }}>
                Hint
            </Typography>
        </Stack>
        <Typography variant="body1" sx={{ color: '#717171', lineHeight: 1.6 }}>
            Start with the <strong>root node</strong>, then go to the <strong>left subtree</strong>, then the <strong>right subtree</strong>.
            Remember: Root → Left → Right!
        </Typography>
    </Box>
);

const StepInstruction: React.FC<{ selectedOrder: number[] }> = ({ selectedOrder }) => (
    <Box sx={{
        borderRadius: 2,
        p: 3,
        mb: 4,
        border: '1px solid #FFB74D'
    }}>
        <Stack direction="row" spacing={1} display="flex" alignItems="center" sx={{ mb: 2 }}>
            <AssignmentIcon color="warning" fontSize="large" />
            <Typography variant="h6" sx={{
                color: '#222222',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 1
            }}>
                Step: Click nodes in preorder sequence
            </Typography>
        </Stack>
        <Typography variant="body1" sx={{ color: '#E65100', lineHeight: 1.6, fontWeight: 500 }}>
            Current order: {selectedOrder.length > 0 ? selectedOrder.map(i => treeNodes[i]?.text).join(' → ') : 'Click nodes to start'}
        </Typography>
    </Box>
);

const PreorderTraversal = ({ containerRef, canvasRef, setStep, setShowStepsIndicator }: StepProps) => {
    const [selectedOrder, setSelectedOrder] = React.useState<number[]>([]);
    const [showSuccess, setShowSuccess] = React.useState(false);
    const [completed, setCompleted] = React.useState(false);
    const [clickedNodeIndex, setClickedNodeIndex] = React.useState<number | null>(null);
    const [showError, setShowError] = React.useState(false);
    const [lastClickedNode, setLastClickedNode] = React.useState<number | null>(null);
    const [lastClickResult, setLastClickResult] = React.useState<'correct' | 'incorrect' | null>(null);

    // Preorder traversal: Root, Left, Right
    const correctPreorder = [0, 1, 3, 4, 2, 5]; // 1, 2, 4, 5, 3, 6

    const handleTreeNodeClick = (nodeIndex: number, nodeValue: string) => {
        setClickedNodeIndex(nodeIndex);
        setLastClickedNode(nodeIndex);
        handleNodeClick(nodeIndex);
    };

    const handleNodeClick = (i: number) => {
        if (completed) return;
        
        if (!selectedOrder.includes(i)) {
            const newOrder = [...selectedOrder, i];
            setSelectedOrder(newOrder);
            setLastClickResult('correct');
            
            // Check if the order matches preorder traversal
            if (newOrder.length === correctPreorder.length) {
                const isCorrect = newOrder.every((node, index) => node === correctPreorder[index]);
                if (isCorrect) {
                    setShowSuccess(true);
                    setCompleted(true);
                    setTimeout(() => setStep(Step.INORDER_TRAVERSAL), 2000);
                } else {
                    setShowError(true);
                    setLastClickResult('incorrect');
                    setTimeout(() => setShowError(false), 2000);
                }
            }
        }
    };

    const resetOrder = () => {
        setSelectedOrder([]);
        setShowSuccess(false);
        setCompleted(false);
        setShowError(false);
        setLastClickResult(null);
    };

    return (
        <>
            <SuccessMessage showSuccess={showSuccess} />
            <ErrorMessage showError={showError} />
            <Grid container>
                <Grid item sm={12} md={6}>
                    <Box
                        sx={{
                            p: 0,
                            boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
                            overflow: 'hidden',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            textAlign: 'left',
                        }}
                    >
                        <Box sx={{ p: 5 }}>
                            <Stack spacing={6} direction="column" sx={{ textAlign: 'left', mb: 6, width: '100%' }}>
                                <SubTitle />
                                <MissionObjective />
                                <StepInstruction selectedOrder={selectedOrder} />
                                <Hint />
                            </Stack>

                            <Box sx={{ textAlign: 'center', mt: 4 }}>
                                <Typography variant="h6" sx={{ mb: 3, color: '#222222', fontWeight: 600 }}>
                                    Click nodes in preorder sequence:
                                </Typography>
                                
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    justifyContent="center"
                                    flexWrap="wrap"
                                    sx={{ mb: 3 }}
                                >
                                    {treeNodes
                                        .filter(node => node !== null)
                                        .map((node, i) => (
                                            <Box
                                                key={i}
                                                onClick={() => handleNodeClick(i)}
                                                sx={{
                                                    width: 60,
                                                    height: 60,
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: completed ? 'default' : 'pointer',
                                                    backgroundColor: selectedOrder.includes(i) ? '#4CAF50' : "#fff",
                                                    color: selectedOrder.includes(i) ? "#fff" : "#000",
                                                    border: selectedOrder.includes(i) ? '2px solid #4CAF50' : '2px solid #E0E0E0',
                                                    fontSize: '18px',
                                                    fontWeight: 600,
                                                    transition: 'all 0.2s ease',
                                                    opacity: completed ? 0.6 : 1,
                                                    '&:hover': {
                                                        borderColor: completed ? '#E0E0E0' : '#4CAF50',
                                                        transform: completed ? 'none' : 'scale(1.05)',
                                                    }
                                                }}
                                            >
                                                {node?.text}
                                            </Box>
                                        ))}
                                </Stack>

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
                            </Box>
                        </Box>
                    </Box>
                </Grid>

                <Grid item sm={12} md={6}>
                    <TreeVisualization
                        containerRef={containerRef}
                        canvasRef={canvasRef}
                        onNodeClick={handleTreeNodeClick}
                        highlightedNodes={clickedNodeIndex !== null ? [clickedNodeIndex] : []}
                        selectedNodes={selectedOrder}
                        disabledNodes={[]}
                        lastClickedNode={lastClickedNode}
                        lastClickResult={lastClickResult}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default PreorderTraversal;
