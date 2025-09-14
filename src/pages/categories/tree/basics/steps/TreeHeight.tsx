import React from "react";
import { Box, Stack, Typography, Fade, Grid } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { StepProps, Step } from "./types";
import { TreeVisualization } from "./TreeVisualization";

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
                You correctly identified the tree height!
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
                Not quite! Count the levels again.
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
            📏 What is the Tree Height?
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
            The <Box component="span" sx={{ fontWeight: 600, color: '#4CAF50' }}>height</Box> of a tree is the number of edges on the longest path from the root to a leaf.
            Count the levels in the tree!
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
            Count from <strong>root (level 0)</strong> to the <strong>deepest leaf</strong>.
            The height is the number of edges, not nodes!
        </Typography>
    </Box>
);

const TreeHeight = ({ containerRef, canvasRef, setStep, setShowStepsIndicator }: StepProps) => {
    const [selectedAnswer, setSelectedAnswer] = React.useState<number | null>(null);
    const [showSuccess, setShowSuccess] = React.useState(false);
    const [errorIndicator, setErrorIndicator] = React.useState<number | null>(null);

    const correctHeight = 3; // The tree has height 3 (root -> level 1 -> level 2 -> level 3)

    const handleAnswerClick = (height: number) => {
        setTimeout(() => {
            setShowStepsIndicator(false);
        }, 2000);

        setTimeout(() => {
            setErrorIndicator(null);
        }, 2000);

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
        <>
            <SuccessMessage showSuccess={showSuccess} />
            <ErrorMessage showError={errorIndicator !== null} />
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

                                <Box sx={{
                                    borderRadius: 2,
                                    p: 3,
                                    mb: 4,
                                    border: '1px solid #FFB74D',
                                    textAlign: 'center',
                                }}
                                >
                                    <Typography variant="h6" sx={{ mb: 3, color: '#222222', fontWeight: 600 }}>
                                        Select the Tree Height:
                                    </Typography>
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        justifyContent="center"
                                        flexWrap="wrap"
                                    >
                                        {[1, 2, 3, 4, 5].map((height) => (
                                            <Box
                                                key={height}
                                                onClick={() => handleAnswerClick(height)}
                                                sx={{
                                                    width: 60,
                                                    height: 60,
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                    backgroundColor: (errorIndicator === height) ? '#F44336' : (selectedAnswer === height) ? '#4CAF50' : "#fff",
                                                    color: (errorIndicator === height) ? "#fff" : (selectedAnswer === height) ? "#fff" : "#000",
                                                    border: (errorIndicator === height) ? '2px solid #F44336' : (selectedAnswer === height) ? '2px solid #4CAF50' : '2px solid #E0E0E0',
                                                    fontSize: '18px',
                                                    fontWeight: 600,
                                                    transition: 'all 0.2s ease',
                                                    '&:hover': {
                                                        borderColor: '#4CAF50',
                                                        transform: 'scale(1.05)',
                                                    }
                                                }}
                                            >
                                                {height}
                                            </Box>
                                        ))}
                                    </Stack>
                                </Box>

                                <Hint />
                            </Stack>
                        </Box>
                    </Box>
                </Grid>

                <Grid item sm={12} md={6}>
                    <TreeVisualization
                        containerRef={containerRef}
                        canvasRef={canvasRef}
                        onNodeClick={() => { }}
                        highlightedNodes={[]}
                        selectedNodes={[]}
                        disabledNodes={[]}
                        lastClickedNode={null}
                        lastClickResult={null}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default TreeHeight;
