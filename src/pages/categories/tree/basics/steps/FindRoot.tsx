import React from "react";
import { Box, Stack, Typography, Fade, Grid } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { StepProps, Step } from "./types";
import { TreeVisualization } from "./TreeVisualization";
import { treeNodes, refreshCanvas } from "../tree";

const SuccessMessage = () => (
    <Fade in>
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
                You found the root node!
            </Typography>
        </Box>
    </Fade>
);

const ErrorMessage = () => (
    <Fade in>
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
                That's not the root node. Look for the topmost node!
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
            🎯 Find the Root Node
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
            Identify and click the <Box component="span" sx={{ fontWeight: 600, color: '#4CAF50' }}>root node</Box> -
            the topmost node with no parent. This is your starting point for tree traversal!
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
            The root node is always at the <strong>top</strong> of the tree and has <strong>no parent</strong>.
            It's the starting point for all tree operations!
        </Typography>
    </Box>
);


const FindRoot = ({ containerRef, canvasRef, setStep, setShowStepsIndicator }: StepProps) => {

    const [rootIndicator, setRootIndicator] = React.useState<string>();
    const [errorIndicator, setErrorIndicator] = React.useState<number>();
    const [showSuccess, setShowSuccess] = React.useState(false);
    const [clickedNodeIndex, setClickedNodeIndex] = React.useState<number | null>(null);
    const [selectedNodes, setSelectedNodes] = React.useState<number[]>([]);
    const [lastClickedNode, setLastClickedNode] = React.useState<number | null>(null);
    const [lastClickResult, setLastClickResult] = React.useState<'correct' | 'incorrect' | null>(null);

    setTimeout(() => {
        setShowStepsIndicator(false);
    }, 3000);

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

    const handleTreeNodeClick = (nodeIndex: number, nodeValue: string) => {
        setClickedNodeIndex(nodeIndex);
        handleClick(nodeIndex, nodeValue);
    };

    const handleClick = (i: number, value: string | null | undefined) => {
        if (rootIndicator) {
            return;
        }
        setErrorIndicator(undefined);
        setClickedNodeIndex(i);
        setLastClickedNode(i);

        if (value === "root") {
            setRootIndicator(value);
            setSelectedNodes([i]);
            setLastClickResult('correct');
            setShowSuccess(true);
            enableRootNode();
            refreshCanvas(containerRef, canvasRef);
            setTimeout(() => {
                setStep(Step.FIND_LEAFS);
                setShowStepsIndicator(true);
            }, 3000);
        } else {
            setErrorIndicator(i);
            setSelectedNodes([]);
            setLastClickResult('incorrect');
            setTimeout(() => {
                setErrorIndicator(undefined);
            }, 3000);
        };
    }

    return (
        <>
            {showSuccess && <SuccessMessage />}
            {errorIndicator !== undefined && <ErrorMessage />}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            p: 5,
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
                        <Stack spacing={6} direction="column" sx={{ textAlign: 'left', mb: 6, width: '100%' }}>
                            <SubTitle />
                            <MissionObjective />
                            <Hint />
                        </Stack>
                    </Box>
                </Grid>

                <Grid item sm={12} md={6}>
                    <TreeVisualization
                        containerRef={containerRef}
                        canvasRef={canvasRef}
                        onNodeClick={handleTreeNodeClick}
                        highlightedNodes={clickedNodeIndex !== null ? [clickedNodeIndex] : []}
                        selectedNodes={selectedNodes}
                        disabledNodes={[]}
                        lastClickedNode={lastClickedNode}
                        lastClickResult={lastClickResult}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default FindRoot;
