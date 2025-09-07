import React from "react";
import { Box, Card, Stack, Typography, ToggleButton, Fade, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { StepProps, Step } from "./types";
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

const FindChildren = ({ containerRef, canvasRef, setStep, showStepsIndicator = true }: StepProps) => {
    const [selectedNode, setSelectedNode] = React.useState<number | null>(null);
    const [selectedChildren, setSelectedChildren] = React.useState<number[]>([]);
    const [correctChildren, setCorrectChildren] = React.useState<number[]>([]);
    const [showSuccess, setShowSuccess] = React.useState(false);
    const [errorIndicator, setErrorIndicator] = React.useState<number | null>(null);
    const [clickedNodeIndex, setClickedNodeIndex] = React.useState<number | null>(null);

    const handleTreeNodeClick = (nodeIndex: number, nodeValue: string) => {
        setClickedNodeIndex(nodeIndex);
        handleNodeClick(nodeIndex, nodeValue);
    };

    const handleNodeClick = (i: number, value: string | null | undefined) => {
        setSelectedNode(i);
        setSelectedChildren([]);
        setErrorIndicator(null);
        
        // Find children of the selected node
        const children: number[] = [];
        if (i === 0) children.push(1, 2); // Root has children 2, 3
        else if (i === 1) children.push(3, 4); // Node 2 has children 4, 5
        else if (i === 2) children.push(5); // Node 3 has child 6
        
        setCorrectChildren(children);
    };

    const handleChildClick = (i: number) => {
        if (selectedNode === null) return;
        
        if (correctChildren.includes(i)) {
            if (!selectedChildren.includes(i)) {
                const newSelected = [...selectedChildren, i];
                setSelectedChildren(newSelected);
                
                if (newSelected.length === correctChildren.length) {
                    setShowSuccess(true);
                    setTimeout(() => setStep(Step.TREE_HEIGHT), 2000);
                }
            }
        } else {
            setErrorIndicator(i);
        }
    };

    return (
        <Box>
            <Stack spacing={6}>
                {showStepsIndicator && <StepsIndicator currentStep={Step.FIND_CHILDREN} />}

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
                            👶 Find the Child Nodes
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
                            <Box component="span" sx={{ fontWeight: 600, color: '#4CAF50' }}>Child nodes</Box> are the direct descendants of a parent node.
                            First select a node, then find all its children.
                        </Typography>

                        {showSuccess && (
                            <Fade in>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 3 }}>
                                    <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: 24 }} />
                                    <Typography sx={{ color: '#4CAF50', fontWeight: 600 }}>
                                        Perfect! You found all the child nodes.
                                    </Typography>
                                </Box>
                            </Fade>
                        )}

                        {errorIndicator !== undefined && (
                            <Fade in>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 3 }}>
                                    <ErrorIcon sx={{ color: '#F44336', fontSize: 24 }} />
                                    <Typography sx={{ color: '#F44336', fontWeight: 600 }}>
                                        That's not a child! Try again.
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
                            {selectedNode === null ? 'Step 1: Select a node to find its children' : `Step 2: Select all children of node ${treeNodes[selectedNode]?.text}`}
                        </Typography>
                    </Box>

                    <Stack spacing={3}>
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', color: '#222222' }}>
                                Select a Node:
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
                                                backgroundColor: selectedNode === i ? '#4CAF50' : "#fff",
                                                color: selectedNode === i ? "#fff" : "#000",
                                                borderColor: selectedNode === i ? '#4CAF50' : '#E0E0E0',
                                            }}
                                            selected={selectedNode === i}
                                            onClick={() => handleNodeClick(i, node?.value)}
                                        >
                                            {node?.text}
                                        </StyledButton>
                                    ))}
                            </Stack>
                        </Box>

                        {selectedNode !== null && (
                            <Box>
                                <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', color: '#222222' }}>
                                    Select all children of node {treeNodes[selectedNode]?.text}:
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
                                                    backgroundColor: (errorIndicator === i) ? '#F44336' :
                                                        (selectedChildren.includes(i)) ? '#4CAF50' : "#fff",
                                                    color: (errorIndicator === i) ? "#fff" :
                                                        (selectedChildren.includes(i)) ? "#fff" : "#000",
                                                    borderColor: (errorIndicator === i) ? '#F44336' :
                                                        (selectedChildren.includes(i)) ? '#4CAF50' : '#E0E0E0',
                                                }}
                                                selected={selectedChildren.includes(i)}
                                                onClick={() => handleChildClick(i)}
                                            >
                                                {node?.text}
                                            </StyledButton>
                                        ))}
                                </Stack>
                            </Box>
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
                                Click on nodes in the tree below to select them
                            </Typography>

                            <TreeVisualization
                                containerRef={containerRef}
                                canvasRef={canvasRef}
                                onNodeClick={handleTreeNodeClick}
                                highlightedNodes={clickedNodeIndex !== null ? [clickedNodeIndex] : []}
                                selectedNodes={selectedNode !== null ? [selectedNode] : []}
                                showLabels={true}
                            />
                        </Card>
                    </Grid>
                </Grid>
            </Stack>
        </Box>
    );
};

export default FindChildren;
