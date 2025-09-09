import React from "react";
import { Box, Card, Stack, Typography, ToggleButton, Fade, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { StepProps, Step } from "./types";
import { TreeVisualization } from "./TreeVisualization";
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

const FindParent = ({ containerRef, canvasRef, setStep }: StepProps) => {
    const [selectedNode, setSelectedNode] = React.useState<number | null>(null);
    const [correctAnswer, setCorrectAnswer] = React.useState<number | null>(null);
    const [showSuccess, setShowSuccess] = React.useState(false);
    const [errorIndicator, setErrorIndicator] = React.useState<number | null>(null);
    const [clickedNodeIndex, setClickedNodeIndex] = React.useState<number | null>(null);

    const handleTreeNodeClick = (nodeIndex: number, nodeValue: string) => {
        setClickedNodeIndex(nodeIndex);
        handleNodeClick(nodeIndex, nodeValue);
    };

    const handleNodeClick = (i: number, value: string | null | undefined) => {
        if (value === "root") {
            setErrorIndicator(i);
            return;
        }
        
        setSelectedNode(i);
        setErrorIndicator(null);
        
        // Find the parent of the selected node
        let parentIndex = -1;
        if (i === 1 || i === 2) parentIndex = 0; // Nodes 2 and 3 have parent 1
        else if (i === 3 || i === 4) parentIndex = 1; // Nodes 4 and 5 have parent 2
        else if (i === 5) parentIndex = 2; // Node 6 has parent 3
        
        setCorrectAnswer(parentIndex);
    };

    const handleParentClick = (i: number) => {
        if (selectedNode === null || correctAnswer === null) return;
        
        if (i === correctAnswer) {
            setShowSuccess(true);
            setTimeout(() => setStep(Step.FIND_CHILDREN), 2000);
        } else {
            setErrorIndicator(i);
        }
    };

    return (
        <Box>
            <Stack spacing={6}>
                <Box sx={{ textAlign: 'left', mb: 6, width: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
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
                            👨‍👩‍👧‍👦 Find the Parent Node
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
                            A <Box component="span" sx={{ fontWeight: 600, color: '#4CAF50' }}>parent node</Box> is the direct ancestor of another node.
                            First select a node, then find its parent!
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
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 3 }}>
                                    <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: 24 }} />
                                    <Typography sx={{ color: '#4CAF50', fontWeight: 600 }}>
                                        Correct! You found the parent node.
                                    </Typography>
                                </Box>
                            </Fade>
                        )}

                        {errorIndicator !== undefined && (
                            <Fade in>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 3 }}>
                                    <ErrorIcon sx={{ color: '#F44336', fontSize: 24 }} />
                                    <Typography sx={{ color: '#F44336', fontWeight: 600 }}>
                                        Not the parent! Try again.
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
                            {selectedNode === null ? 'Step 1: Select a node to find its parent' : 'Step 2: Now select the parent node'}
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
                                    Now find the parent of node {treeNodes[selectedNode]?.text}:
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
                                                        (i === correctAnswer) ? '#4CAF50' : "#fff",
                                                    color: (errorIndicator === i) ? "#fff" :
                                                        (i === correctAnswer) ? "#fff" : "#000",
                                                    borderColor: (errorIndicator === i) ? '#F44336' :
                                                        (i === correctAnswer) ? '#4CAF50' : '#E0E0E0',
                                                }}
                                                selected={i === correctAnswer}
                                                onClick={() => handleParentClick(i)}
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
                                disabledNodes={[0]} // Disable root node for parent selection
                            />
                        </Card>
                    </Grid>
                </Grid>
            </Stack>
        </Box>
    );
};

export default FindParent;
