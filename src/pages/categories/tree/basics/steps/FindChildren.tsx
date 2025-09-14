import React from "react";
import { Box, Stack, Typography, Fade, Grid } from "@mui/material";
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
                You found all the child nodes!
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
                That's not a child node. Try again!
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
            👶 Find the Child Nodes
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
            <Box component="span" sx={{ fontWeight: 600, color: '#4CAF50' }}>Child nodes</Box> are the direct descendants of a parent node.
            First select a node, then find all its children!
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
            The <strong>child nodes</strong> are the direct descendants of a parent node.
            Click on a node first, then click on all its children!
        </Typography>
    </Box>
);

const StepInstruction: React.FC<{ selectedNode: number | null }> = ({ selectedNode }) => (
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
                Step: {selectedNode === null ? 1 : 2}
            </Typography>
        </Stack>
        <Typography variant="body1" sx={{ color: '#E65100', lineHeight: 1.6, fontWeight: 500 }}>
            {selectedNode === null
                ? 'Click on a node to find its children'
                : `Now click on all children of node ${treeNodes[selectedNode]?.text}`
            }
        </Typography>
    </Box>
);

const FindChildren = ({ containerRef, canvasRef, setStep, setShowStepsIndicator }: StepProps) => {
    const [selectedNode, setSelectedNode] = React.useState<number | null>(null);
    const [selectedChildren, setSelectedChildren] = React.useState<number[]>([]);
    const [correctChildren, setCorrectChildren] = React.useState<number[]>([]);
    const [showSuccess, setShowSuccess] = React.useState(false);
    const [errorIndicator, setErrorIndicator] = React.useState<number | null>(null);
    const [clickedNodeIndex, setClickedNodeIndex] = React.useState<number | null>(null);
    const [lastClickedNode, setLastClickedNode] = React.useState<number | null>(null);
    const [lastClickResult, setLastClickResult] = React.useState<'correct' | 'incorrect' | null>(null);

    const getChildren = (i: number, value: string | null | undefined) => {
        // Calculate children using binary tree formula
        // For a binary tree, children of node at index i are at 2*i+1 and 2*i+2
        const children: number[] = [];
        const leftChild = 2 * i + 1;
        const rightChild = 2 * i + 2;

        if (leftChild < treeNodes.length && treeNodes[leftChild] !== null) {
            children.push(leftChild);
        }
        if (rightChild < treeNodes.length && treeNodes[rightChild] !== null) {
            children.push(rightChild);
        }

        return children;
    };

    const handleStep1 = (nodeIndex: number, nodeValue: string) => {
        if (nodeValue === "leaf") {
            setErrorIndicator(nodeIndex);
            setLastClickResult('incorrect');
            return;
        }

        setSelectedNode(nodeIndex);
        setSelectedChildren([]);
        setLastClickResult('correct');

        const children = getChildren(nodeIndex, nodeValue);
        setCorrectChildren(children);
    }

    const handleStep2 = (nodeIndex: number, nodeValue: string) => {
        if (selectedNode === null) {
            return;
        }

        if (correctChildren.includes(nodeIndex)) {
            setLastClickResult('correct');

            if (!selectedChildren.includes(nodeIndex)) {
                const newSelected = [...selectedChildren, nodeIndex];
                setSelectedChildren(newSelected);

                if (newSelected.length === correctChildren.length) {
                    setShowSuccess(true);
                    setTimeout(() => setStep(Step.TREE_HEIGHT), 2000);
                }
            }
        } else {
            setErrorIndicator(nodeIndex);
            setLastClickResult('incorrect');
        }
    }

    const handleTreeNodeClick = (nodeIndex: number, nodeValue: string) => {
        setErrorIndicator(null);
        setShowStepsIndicator(false);
        setClickedNodeIndex(nodeIndex);
        setLastClickedNode(nodeIndex);

        setTimeout(() => {
            setErrorIndicator(null);
        }, 2000);

        if (selectedNode === null) {
            handleStep1(nodeIndex, nodeValue);
        } else {
            handleStep2(nodeIndex, nodeValue);
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
                                <StepInstruction selectedNode={selectedNode} />
                                <Hint />
                            </Stack>
                        </Box>
                    </Box>
                </Grid>

                <Grid item sm={12} md={6}>
                    <TreeVisualization
                        containerRef={containerRef}
                        canvasRef={canvasRef}
                        onNodeClick={handleTreeNodeClick}
                        highlightedNodes={clickedNodeIndex !== null ? [clickedNodeIndex] : []}
                        selectedNodes={selectedNode !== null ? [selectedNode] : []}
                        disabledNodes={[]}
                        lastClickedNode={lastClickedNode}
                        lastClickResult={lastClickResult}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default FindChildren;
