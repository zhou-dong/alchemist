import React from "react";
import { Fab, Tooltip } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface StepsIndicatorFabProps {
    showStepsIndicator: boolean;
    onToggle: () => void;
}

export const StepsIndicatorFab: React.FC<StepsIndicatorFabProps> = ({
    showStepsIndicator,
    onToggle
}) => {
    return (
        <Tooltip
            title={showStepsIndicator ? "Hide Progress" : "Show Progress"}
            placement="left"
        >
            <Fab
                color="primary"
                size="large"
                onClick={onToggle}
                sx={{
                    position: 'fixed',
                    bottom: 80,
                    right: 24,
                    color: 'white',
                    zIndex: 1000,
                }}
            >
                {showStepsIndicator ? <VisibilityOff /> : <Visibility />}
            </Fab>
        </Tooltip>
    );
};
