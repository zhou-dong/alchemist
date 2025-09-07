import React from "react";
import { Box, Card, Stack, Typography, ToggleButton, Fade, Button, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { StepProps, Step } from "./types";
import { TreeVisualization } from "./TreeVisualization";
import { StepsIndicator } from "./StepsIndicator";
import { treeNodes } from "../tree";

const StyledButton = styled(ToggleButton)({
    width: "70px",
    height: "70px",
    minWidth: "70px",
    minHeight: "70px",
    borderRadius: "50%",
    textTransform: 'none',
    border: '3px solid #E0E0E0',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    '&:hover, &.Mui-focusVisible': {
        color: "#000",
        borderColor: '#4CAF50',
        boxShadow: '0 6px 12px rgba(76, 175, 80, 0.3)',
        transform: 'translateY(-2px)',
    },
    "&.Mui-selected": {
        backgroundColor: '#4CAF50',
        color: "#fff",
        borderColor: '#4CAF50',
        boxShadow: '0 6px 12px rgba(76, 175, 80, 0.4)',
        '&:hover, &.Mui-focusVisible': {
            backgroundColor: '#45A049',
            borderColor: '#45A049',
            transform: 'translateY(-2px)',
        },
    },
    fontSize: "20px",
    fontWeight: 700,
    transition: 'all 0.3s ease',
    cursor: 'pointer',
});

const FindLeafs = ({ containerRef, canvasRef, setStep, showStepsIndicator = true }: StepProps) => {
    const [selected, setSelected] = React.useState<number[]>([]);
    const [errorIndicator, setErrorIndicator] = React.useState<number>();
    const [showSuccess, setShowSuccess] = React.useState(false);
    const [completed, setCompleted] = React.useState(false);
    const [clickedNodeIndex, setClickedNodeIndex] = React.useState<number | null>(null);

    const leafNodes = [3, 4, 5]; // Indices of leaf nodes (4, 5, 6 in 1-based indexing)

    const handleNodeClick = (nodeIndex: number, nodeValue: string) => {
        if (completed) return;
        
        setClickedNodeIndex(nodeIndex);
        setErrorIndicator(undefined);

        if (nodeValue === "leaf") {
            if (!selected.includes(nodeIndex)) {
                setSelected(prev => [...prev, nodeIndex]);
            }
            
            if (selected.length + 1 === leafNodes.length) {
                setCompleted(true);
                setShowSuccess(true);
                setTimeout(() => setStep(Step.FIND_PARENT), 2000);
            }
        } else {
            setErrorIndicator(nodeIndex);
        }
    };

    const handleClick = (i: number, value: string | null | undefined) => {
        if (completed) return;

        setErrorIndicator(undefined);

        if (value === "leaf") {
            if (!selected.includes(i)) {
                const newSelected = [...selected, i];
                setSelected(newSelected);

                // Check if all leaf nodes are selected
                const selectedLeafs = newSelected.filter(idx => leafNodes.includes(idx));
                if (selectedLeafs.length === leafNodes.length) {
                    setShowSuccess(true);
                    setCompleted(true);
                    setTimeout(() => {
                        setStep(Step.FIND_PARENT);
                    }, 2000);
                }
            }
        } else {
            setErrorIndicator(i);
        }
    };

    return (
        <Box>
            <Stack spacing={6}>
                {showStepsIndicator && <StepsIndicator currentStep={Step.FIND_LEAFS} />}

                <Box sx={{ textAlign: 'left', mb: 6, width: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        <Box sx={{
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            borderRadius: '50%',
                            width: 40,
                            height: 40,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.2rem',
                            fontWeight: 600
                        }}>
                            2
                        </Box>
                        <Typography
                            variant="h2"
                            sx={{
                                color: '#222222',
                                fontWeight: 600,
                                fontSize: { xs: '2.5rem', md: '3rem' },
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
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#4CAF50',
                                fontWeight: 600,
                                mb: 2,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}
                        >
                            🎮 Mission Objective
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#222222',
                                fontWeight: 400,
                                fontSize: '1rem',
                                lineHeight: 1.6
                            }}
                        >
                            Identify and click all <Box component="span" sx={{ fontWeight: 600, color: '#4CAF50' }}>leaf nodes</Box> - 
                            nodes with no children. These are the endpoints of the tree!
                        </Typography>
                    </Box>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Card
                            sx={{
                                p: 0,
                                borderRadius: 3,
                                backgroundColor: 'white',
                                border: 'none',
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

                        <Box sx={{
                            backgroundColor: '#F5F5F5',
                            borderRadius: 2,
                            p: 3,
                            mb: 4,
                            border: '1px solid #E0E0E0'
                        }}>
                            <Typography variant="h6" sx={{
                                color: '#222222',
                                fontWeight: 600,
                                mb: 2,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}>
                                💡 Hint
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#717171', lineHeight: 1.6 }}>
                                Leaf nodes are at the <strong>bottom</strong> of the tree and have <strong>no children</strong>. 
                                They are the endpoints of tree branches!
                            </Typography>
                        </Box>

                        <Typography variant="h5" sx={{
                            mb: 3,
                            color: '#222222',
                            fontWeight: 600,
                            textAlign: 'center'
                        }}>
                            🎮 Click All Leaf Nodes
                        </Typography>
                    </Box>

                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                        flexWrap="wrap"
                    >
                        {
                            treeNodes
                                .filter(node => node !== null)
                                .map((node, i) =>
                                    <StyledButton
                                        key={i}
                                        value={node?.value}
                                        sx={{
                                            backgroundColor: (errorIndicator === i) ? '#F44336' :
                                                (selected.includes(i)) ? '#4CAF50' : "#fff",
                                            color: (errorIndicator === i) ? "#fff" :
                                                (selected.includes(i)) ? "#fff" : "#000",
                                            borderColor: (errorIndicator === i) ? '#F44336' :
                                                (selected.includes(i)) ? '#4CAF50' : '#E0E0E0',
                                        }}
                                        disabled={i === 0 || completed} // Disable root node
                                        selected={selected.includes(i)}
                                        onClick={() => handleClick(i, node?.value)}
                                    >
                                        {node?.text}
                                    </StyledButton>
                                )
                        }
                    </Stack>

                    {completed && (
                        <Fade in>
                            <Box sx={{ textAlign: 'center', mt: 4 }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={() => setStep(Step.FIND_ROOT)}
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
                                    Start Over
                                </Button>
                            </Box>
                        </Fade>
                    )}
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
                                Click on the leaf nodes in the tree below
                            </Typography>

                            <TreeVisualization
                                containerRef={containerRef}
                                canvasRef={canvasRef}
                                onNodeClick={handleNodeClick}
                                highlightedNodes={clickedNodeIndex !== null ? [clickedNodeIndex] : []}
                                selectedNodes={selected}
                                disabledNodes={[0]} // Disable root node
                                showLabels={true}
                            />
                        </Card>
                    </Grid>
                </Grid>
            </Stack>
        </Box>
    );
};

export default FindLeafs;
