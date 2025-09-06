import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { Step, stepNames, stepNumber, totalSteps } from "./types";

export const Basics = ({ currentStep }: { currentStep: Step }) => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h2"
                    sx={{
                        color: '#222222',
                        fontWeight: 600,
                        fontSize: { xs: '2rem', md: '2.5rem' },
                        lineHeight: 1.1,
                        mb: 2,
                        letterSpacing: '-0.02em'
                    }}
                >
                    🌱 Tree Basics
                </Typography>

                <Typography
                    variant="h5"
                    sx={{
                        color: '#717171',
                        fontWeight: 400,
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        lineHeight: 1.4,
                    }}
                >
                    Let's explore the fundamental concepts of tree data structures through interactive learning.
                </Typography>
            </Box>
        </Container>
    );
};

export const StyledButton = {
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
};
