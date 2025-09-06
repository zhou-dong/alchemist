import React from "react";
import { Box, Card, Stack, Typography, ToggleButton, Fade, Button, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
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

const FindLeafs = ({ containerRef, canvasRef, setStep }: StepProps) => {
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
                <Basics currentStep={Step.FIND_LEAFS} />
                <StepsIndicator currentStep={Step.FIND_LEAFS} />

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
                            🍃 Find the Leaf Nodes
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
                            <Box component="span" sx={{ fontWeight: 600, color: '#4CAF50' }}>Leaf nodes</Box> are nodes that have no children.
                            They are the "end points" of the tree branches.
                        </Typography>

                        {showSuccess && (
                            <Fade in>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 3 }}>
                                    <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: 24 }} />
                                    <Typography sx={{ color: '#4CAF50', fontWeight: 600 }}>
                                        Excellent! You found all the leaf nodes.
                                    </Typography>
                                </Box>
                            </Fade>
                        )}

                        {errorIndicator !== undefined && (
                            <Fade in>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 3 }}>
                                    <ErrorIcon sx={{ color: '#F44336', fontSize: 24 }} />
                                    <Typography sx={{ color: '#F44336', fontWeight: 600 }}>
                                        That's not a leaf node. Try again!
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
                            Select all the leaf nodes (nodes with no children)
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
