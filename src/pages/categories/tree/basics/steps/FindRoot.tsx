import React from "react";
import { Box, Card, Stack, Typography, ToggleButton, Fade, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { StepProps, Step } from "./types";
import { Basics } from "./components";
import { TreeVisualization } from "./TreeVisualization";
import { StepsIndicator } from "./StepsIndicator";
import { treeNodes, refreshCanvas } from "../tree";

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

const FindRoot = ({ containerRef, canvasRef, setStep }: StepProps) => {
    const delay = 2000;

    const [rootIndicator, setRootIndicator] = React.useState<string>();
    const [errorIndicator, setErrorIndicator] = React.useState<number>();
    const [showSuccess, setShowSuccess] = React.useState(false);
    const [clickedNodeIndex, setClickedNodeIndex] = React.useState<number | null>(null);

    const enableRootNode = () => {
        treeNodes
            .filter(node => node?.value === "root")
            .forEach(node => {
                if (node) {
                    node.selected = true;
                    node.emoji = "root";
                }
            });
    }

    const handleNodeClick = (nodeIndex: number, nodeValue: string) => {
        if (rootIndicator) {
            return;
        }
        setClickedNodeIndex(nodeIndex);
        setErrorIndicator(undefined);
        
        if (nodeValue === "root") {
            setRootIndicator(nodeValue);
            setShowSuccess(true);
            enableRootNode();
            setTimeout(() => setStep(Step.FIND_LEAFS), delay);
        } else {
            setErrorIndicator(nodeIndex);
        }
    };

    const handleClick = (i: number, value: string | null | undefined) => {
        if (rootIndicator) {
            return;
        }
        setErrorIndicator(undefined);
        if (value === "root") {
            setRootIndicator(value);
            setShowSuccess(true);
            enableRootNode();
            refreshCanvas(containerRef, canvasRef);
            setTimeout(() => setStep(Step.FIND_LEAFS), delay);
        } else {
            setErrorIndicator(i);
        };
    }

    return (
        <Box>
            <Stack spacing={6}>
                <Basics currentStep={Step.FIND_ROOT} />
                <StepsIndicator currentStep={Step.FIND_ROOT} />

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
                                    🎯 Find the Root Node
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
                                    The <Box component="span" sx={{ fontWeight: 600, color: '#4CAF50' }}>root</Box> is the topmost node in a tree.
                                    It has no parent and is the starting point for traversing the entire tree.
                                </Typography>

                                {showSuccess && (
                                    <Fade in>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 3 }}>
                                            <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: 24 }} />
                                            <Typography sx={{ color: '#4CAF50', fontWeight: 600 }}>
                                                Correct! The root is the topmost node.
                                            </Typography>
                                        </Box>
                                    </Fade>
                                )}

                                {errorIndicator !== undefined && (
                                    <Fade in>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 3 }}>
                                            <ErrorIcon sx={{ color: '#F44336', fontSize: 24 }} />
                                            <Typography sx={{ color: '#F44336', fontWeight: 600 }}>
                                                Not quite! Try again.
                                            </Typography>
                                        </Box>
                                    </Fade>
                                )}
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
                                                    backgroundColor: (errorIndicator === i) ? '#F44336' : "#fff",
                                                    color: (errorIndicator === i) ? "#fff" : "#000",
                                                    borderColor: (errorIndicator === i) ? '#F44336' : '#E0E0E0',
                                                }}
                                                disabled={rootIndicator !== undefined && rootIndicator !== node?.value}
                                                selected={rootIndicator === node?.value}
                                                onClick={() => handleClick(i, node?.value)}
                                            >
                                                {node?.text}
                                            </StyledButton>
                                        )
                                }
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
                                Click on the nodes in the tree below to select them
                            </Typography>

                            <TreeVisualization
                                containerRef={containerRef}
                                canvasRef={canvasRef}
                                onNodeClick={handleNodeClick}
                                highlightedNodes={clickedNodeIndex !== null ? [clickedNodeIndex] : []}
                                selectedNodes={rootIndicator ? [0] : []}
                                showLabels={true}
                            />
                        </Card>
                    </Grid>
                </Grid>
            </Stack>
        </Box>
    );
};

export default FindRoot;
