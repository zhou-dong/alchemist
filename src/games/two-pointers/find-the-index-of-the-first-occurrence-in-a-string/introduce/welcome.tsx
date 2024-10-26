import React from 'react';
import { Box, Button, ButtonGroup, Grid, IconButton, Paper, Stack, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { title } from '../contents';
import Title from './Title';
import { green } from '@mui/material/colors';

const FloatText = styled(Typography)(({ theme }) => ({
    display: 'inline', // Ensure it works properly for inline text
    animation: 'glow 1.5s infinite, rotate 4s linear infinite',
    textShadow: "#ffcc00",
    '@keyframes float': {
        '0%': {
            transform: 'translateX(0)',
        },
        '50%': {
            transform: 'translateX(15px)',
        },
        '100%': {
            transform: 'translateX(0)',
        },
    },
    '@keyframes glow': {
        '0%': { textShadow: '0 0 5px #ffcc00' }, // Increased the blur
        '50%': { textShadow: '0 0 20px #ffcc00, 0 0 50px #ffcc00, 0 0 100px #ffcc00' }, // Added more layers
        '100%': { textShadow: '0 0 5px #ffcc00' }, // Increased the blur
    },
    '@keyframes rotate': {
        '0%': {
            transform: 'rotate(0deg)',
        },
        '100%': {
            transform: 'rotate(360deg)',
        },
    },
}));


const message = "Join us on a delightful journey as we explore how to find the index of the first occurrence of a substring in a string. Whether you're a newbie or a coding wizard, this guide is crafted just for you! 🚀";


const Main = () => (
    <Stack
        direction="column"
        sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        }}
        spacing={3}
    >
        <Stack
            direction="row"
            spacing={1}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <FloatText variant='h3'>
                🌟
            </FloatText>
            <Typography variant='h4' display="inline" sx={{ fontWeight: 300 }}>
                Welcome to the String Search Adventure!
            </Typography>
        </Stack>

        <Paper
            sx={{
                width: "80%",
                padding: "20px",
                // backgroundColor: green[500]
            }}>
            <Typography
                variant='h6'
                sx={{
                    // color: "#fff",
                    fontWeight: 350
                }}
            >
                {message}
            </Typography>
        </Paper>
    </Stack>
);

export default Main;
