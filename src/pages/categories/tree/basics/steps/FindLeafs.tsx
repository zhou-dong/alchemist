import React from "react";
import { Box, Stack, Typography, Fade, Grid } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { StepProps, Step } from "./types";
import { TreeVisualization } from "./TreeVisualization";

const FindLeafs = ({ containerRef, canvasRef, setStep, setShowStepsIndicator }: StepProps) => {
    const [selected, setSelected] = React.useState<number[]>([]);
    const [errorIndicator, setErrorIndicator] = React.useState<number>();
    const [showSuccess, setShowSuccess] = React.useState(false);
    const [completed, setCompleted] = React.useState(false);
    const [clickedNodeIndex, setClickedNodeIndex] = React.useState<number | null>(null);
    const [lastClickedNode, setLastClickedNode] = React.useState<number | null>(null);
    const [lastClickResult, setLastClickResult] = React.useState<'correct' | 'incorrect' | null>(null);

    const leafNodes = [3, 4, 6]; // Indices of leaf nodes (4, 5, 6 in 1-based indexing)

    const handleNodeClick = (nodeIndex: number, nodeValue: string) => {
        if (completed) return;

        setShowStepsIndicator(false);
        setErrorIndicator(undefined);

        if (nodeValue === "leaf" && selected.includes(nodeIndex)) {
            return;
        }

        setClickedNodeIndex(nodeIndex);
        setLastClickedNode(nodeIndex);

        if (nodeValue === "leaf") {
            if (!selected.includes(nodeIndex)) {
                const newSelected = [...selected, nodeIndex];
                setSelected(newSelected);
                setLastClickResult('correct');

                // Check if all leaf nodes are selected
                const selectedLeafs = newSelected.filter(idx => leafNodes.includes(idx));
                if (selectedLeafs.length === leafNodes.length) {
                    setCompleted(true);
                    setShowSuccess(true);
                    setTimeout(() => setStep(Step.FIND_PARENT), 2000);
                }
            }
        } else {
            setErrorIndicator(nodeIndex);
            setLastClickResult('incorrect');
        }
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
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
                                    🍃 Find the Leaf Nodes
                                </Typography>
                            </Box>

                            <Box sx={{
                                backgroundColor: '#F0F8FF',
                                border: '2px solid #4CAF50',
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
                                    Identify and click <Box component="span" sx={{ fontWeight: 600, color: '#4CAF50' }}>all leaf nodes</Box> -
                                    nodes with no children. These are the endpoints of the tree!
                                </Typography>
                            </Box>

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
                                    Leaf nodes are at the <strong>bottom</strong> of the tree and have <strong>no children</strong>.
                                    They are the endpoints of tree branches!
                                </Typography>
                            </Box>
                        </Stack>

                        {showSuccess && (
                            <Fade in>
                                <Box sx={{
                                    backgroundColor: '#E8F5E8',
                                    border: '2px solid #4CAF50',
                                    borderRadius: 2,
                                    p: 3,
                                    mb: 4,
                                    textAlign: 'center'
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
                                        <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: 32 }} />
                                        <Typography variant="h5" sx={{ color: '#4CAF50', fontWeight: 600 }}>
                                            🎉 Excellent Work!
                                        </Typography>
                                    </Box>
                                    <Typography sx={{ color: '#4CAF50', fontWeight: 500 }}>
                                        You found all the leaf nodes!
                                    </Typography>
                                </Box>
                            </Fade>
                        )}

                        {errorIndicator !== undefined && (
                            <Fade in>
                                <Box sx={{
                                    backgroundColor: '#FFEBEE',
                                    border: '2px solid #F44336',
                                    borderRadius: 2,
                                    p: 3,
                                    mb: 4,
                                    textAlign: 'center'
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
                                        <ErrorIcon sx={{ color: '#F44336', fontSize: 32 }} />
                                        <Typography variant="h5" sx={{ color: '#F44336', fontWeight: 600 }}>
                                            ❌ Try Again!
                                        </Typography>
                                    </Box>
                                    <Typography sx={{ color: '#F44336', fontWeight: 500 }}>
                                        That's not a leaf node. Look for nodes with no children!
                                    </Typography>
                                </Box>
                            </Fade>
                        )}

                    </Box>
                </Box>
            </Grid>

            <Grid item sm={12} md={6}>
                <TreeVisualization
                    containerRef={containerRef}
                    canvasRef={canvasRef}
                    onNodeClick={handleNodeClick}
                    highlightedNodes={clickedNodeIndex !== null ? [clickedNodeIndex] : []}
                    selectedNodes={selected}
                    disabledNodes={[]}
                    lastClickedNode={lastClickedNode}
                    lastClickResult={lastClickResult}
                />
            </Grid>
        </Grid>
    );
};

export default FindLeafs;
