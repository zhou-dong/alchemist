import React from "react";
import { Box, Card, Stack, Typography, ToggleButton, Fade } from "@mui/material";
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { StepProps, Step } from "./types";
import { StepsIndicator } from "./StepsIndicator";
import { treeNodes, refreshCanvas } from "../tree";

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

const FindRoot = ({ containerRef, canvasRef, setStep, showStepsIndicator = true }: StepProps) => {
    const delay = 2000;

    const [rootIndicator, setRootIndicator] = React.useState<string>();
    const [errorIndicator, setErrorIndicator] = React.useState<number>();
    const [showSuccess, setShowSuccess] = React.useState(false);

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

                {showStepsIndicator && <StepsIndicator currentStep={Step.FIND_ROOT} />}


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
                            1
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
                            🎯 Find the Root Node
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
                            Identify and click the <Box component="span" sx={{ fontWeight: 600, color: '#4CAF50' }}>root node</Box> -
                            the topmost node with no parent. This is your starting point for tree traversal!
                        </Typography>
                    </Box>

                </Box>

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
                                        You found the root node!
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
                                        That's not the root node. Look for the topmost node!
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
                                The root node is always at the <strong>top</strong> of the tree and has <strong>no parent</strong>.
                                It's the starting point for all tree operations!
                            </Typography>
                        </Box>

                        <Typography variant="h5" sx={{
                            mb: 3,
                            color: '#222222',
                            fontWeight: 600,
                            textAlign: 'center'
                        }}>
                            🎮 Click the Root Node
                        </Typography>

                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{ flexWrap: 'wrap', gap: 2 }}
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
                    </Box>
                </Card>
            </Stack>
        </Box>
    );
};

export default FindRoot;
