import React from 'react';
import { Box, Button, ButtonGroup, Grid, IconButton, Paper, Stack, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { title } from "../contents";
import { green } from '@mui/material/colors';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const Center = styled('div')(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // height: "100vh"
}));

const Code = styled("code")({
    backgroundColor: '#e0f7fa',
    padding: '2px 4px',
    borderRadius: '4px'
});

interface Section {
    label: string;
    description: string;
}


const Welcome = () => {
    const [text, setText] = React.useState("");

    const message = "Join us on a delightful journey as we explore how to find the index of the first occurrence of a substring in a string. Whether you're a newbie or a coding wizard, this guide is crafted just for you! 🚀";
    const words = message.split('');

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

    React.useEffect(() => {
        let index = 0;
        let timeoutId: ReturnType<typeof setTimeout>;

        function displayNextWord() {
            if (index < words.length - 1) {
                setText(prevText => prevText + words[index]);
                index++;
                timeoutId = setTimeout(displayNextWord, 70);
            }
        }


        displayNextWord();

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <>
            <Stack
                direction="row"
                spacing={1}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
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
                    backgroundColor: green[500]
                }}>
                <Typography
                    variant='h6'
                    sx={{
                        color: "#fff",
                        fontWeight: 350
                    }}
                >
                    {text}
                </Typography>
            </Paper>
        </>
    );
};

const steps: Section[] = [
    {
        label: "👋 Welcome!",
        description: "Welcome to the String Search Adventure! Join us on a delightful journey as we explore how to find the index of the first occurrence of a substring in a string. Whether you're a newbie or a coding wizard, this is crafted just for you! 🚀"
    },
    {
        label: "🔍 Description",
        description: "What is this Algorithm? This algorithm helps locate the position of a substring within a larger string. If found, it returns the index; if not, it returns -1."

    },
    {
        label: "🎮 Demonstration",
        description: "We'll demonstrate the steps of the algorithm using a two-dimensional table. Let’s code and rock! 🎸"
    },
    {
        label: "🏁 Conclusion",
        description: "This algorithm is efficient for short strings and is often used in programming challenges. Happy coding! 🎉"
    },
]

const Section: React.FC<{ title: string, description: string }> = ({ title, description }) => (
    <Paper elevation={4} style={{ padding: '24px', borderRadius: '12px', backgroundColor: '#f9f9f9' }}>
        <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 300 }}>
            {title}
        </Typography>
        <Typography variant="body1" gutterBottom>
            {description}
        </Typography>
    </Paper>
);

const Example = () => (
    <Paper elevation={4} style={{ padding: '24px', borderRadius: '12px', backgroundColor: '#f9f9f9' }}>
        <Typography variant="h6" gutterBottom color="primary" sx={{
            // color: '#1976d2'
            fontWeight: 300
        }}>
            📚 Example
        </Typography>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="body1">
                    Imagine the main string: <Code>"hello world"</Code>
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1">
                    And the substring: <Code>"world"</Code>
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1">
                    The algorithm checks each character in the main string until it finds
                    <Code>"world"</Code> starting at
                    index <Code>6</Code>. ✔️
                </Typography>
            </Grid>
        </Grid>
    </Paper>
);

const Main = () => {

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(step => step + 1);
    };

    const handleBack = () => {
        setActiveStep(step => step - 1);
    };

    return (
        <>

            <Stack
                sx={{
                    position: "fixed",
                    top: "6%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%"
                }}
                direction="column"
                spacing={2}
            >
                <Stepper
                    nonLinear
                    activeStep={activeStep}
                >
                    {steps.map((s, index) => (
                        <Step key={index}>
                            <StepLabel
                                sx={{
                                    '& .MuiStepIcon-root': {
                                        width: '45px',
                                        height: '45px',
                                    },
                                    '& .MuiStepIcon-text': {
                                        fontSize: '0.8rem',
                                    },
                                }}
                            >
                                {s.label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Welcome />

            </Stack>


            <Stack
                direction="row"
                spacing={2}
                sx={{
                    position: "fixed",
                    bottom: "20%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    zIndex: 1
                }}
            >

                <IconButton
                    sx={{
                        border: "2px solid lightgrey",
                        width: 65,
                        height: 65,
                    }}
                    disabled={activeStep === 0}
                    color="primary"
                    onClick={handleBack}
                >
                    <NavigateBeforeIcon fontSize='large' />
                </IconButton>

                <IconButton
                    sx={{
                        border: "2px solid lightgrey",
                        width: 65,
                        height: 65
                    }}
                    disabled={activeStep === steps.length}
                    color="primary"
                    onClick={handleNext}
                >
                    <NavigateNextIcon fontSize='large' />
                </IconButton>

            </Stack>
        </>
    )
}

export default Main;
