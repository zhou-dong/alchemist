import React from "react";
import { Box, Stepper, Step, StepLabel } from "@mui/material";
import { Step as StepEnum, stepNames, stepNumber, totalSteps } from "./types";

interface StepsIndicatorProps {
    currentStep: StepEnum;
}

export const StepsIndicator: React.FC<StepsIndicatorProps> = ({ currentStep }) => {
    const currentStepNumber = stepNumber(currentStep);

    return (
        <Box sx={{ mb: 4 }}>
            <Stepper
                activeStep={currentStepNumber - 1}
                alternativeLabel
                sx={{
                    '& .MuiStepLabel-root': {
                        '& .MuiStepLabel-label': {
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            color: '#717171',
                        },
                        '& .MuiStepLabel-label.Mui-active': {
                            color: '#4CAF50',
                            fontWeight: 600,
                        },
                        '& .MuiStepLabel-label.Mui-completed': {
                            color: '#4CAF50',
                            fontWeight: 500,
                        }
                    },
                    '& .MuiStepConnector-root': {
                        top: '1.75rem',
                        '& .MuiStepConnector-line': {
                            borderColor: '#E0E0E0',
                            borderTopWidth: '3px',
                            marginLeft: '1.75rem',
                            marginRight: '1.75rem',
                        },
                        '&.Mui-active .MuiStepConnector-line': {
                            borderColor: '#4CAF50',
                        },
                        '&.Mui-completed .MuiStepConnector-line': {
                            borderColor: '#4CAF50',
                        }
                    },
                    '& .MuiStepIcon-root': {
                        color: '#E0E0E0',
                        fontSize: '2.5rem',
                        width: '3.5rem',
                        height: '3.5rem',
                        '&.Mui-active': {
                            color: '#4CAF50',
                        },
                        '&.Mui-completed': {
                            color: '#4CAF50',
                        }
                    }
                }}
            >
                {Object.values(StepEnum).map((step, index) => (
                    <Step key={step} completed={index < currentStepNumber - 1}>
                        <StepLabel>
                            {stepNames[step]}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>

        </Box>
    );
};
