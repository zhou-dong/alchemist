import React from 'react';
import { Box, Button, Grid, Paper, Stack, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { title } from "../contents";



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

const steps: Section[] = [
    {
        label: "👋 Welcome to the String Search Adventure!",
        description: "Join us on a delightful journey as we explore how to find the index of the first occurrence of a substring in a string. Whether you're a newbie or a coding wizard, this is crafted just for you! 🚀"
    },
    {
        label: "🔍 What is this Algorithm?",
        description: "This algorithm helps locate the position of a substring within a larger string. If found, it returns the index; if not, it returns -1."

    },
    {
        label: "🎮 Demonstration?",
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
    const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        setCompleted({
            ...completed,
            [activeStep]: true,
        });
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };



    return (
        <Stack
            sx={{
                // marginTop: "5%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh"
            }}
        >


            <Typography
                variant="h5"
                // color="primary"
                sx={{ fontWeight: 200 }}
            >
                {title}
            </Typography>

            <Stepper nonLinear alternativeLabel activeStep={activeStep}>
                {steps.map((s, index) => (
                    <Step key={s.label} completed={completed[index]}>
                        <StepLabel>{s.label}</StepLabel>
                        <StepContent>
                            {s.description}
                        </StepContent>
                    </Step>
                ))}
            </Stepper>

            <div>
                {allStepsCompleted() ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleNext} sx={{ mr: 1 }}>
                                Next
                            </Button>
                            {activeStep !== steps.length &&
                                (completed[activeStep] ? (
                                    <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                        Step {activeStep + 1} already completed
                                    </Typography>
                                ) : (
                                    <Button onClick={handleComplete}>
                                        {completedSteps() === totalSteps() - 1
                                            ? 'Finish'
                                            : 'Complete Step'}
                                    </Button>
                                ))}
                        </Box>
                    </React.Fragment>
                )}
            </div>

        </Stack>
    )
}

export default Main;
