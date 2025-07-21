import React from 'react';
import * as PlayArrow from '@mui/icons-material/PlayArrow';
import * as ArrowForward from '@mui/icons-material/ArrowForward';
import * as RocketLaunch from '@mui/icons-material/RocketLaunch';

const PlayArrowIcon = PlayArrow.default as unknown as React.ElementType;
const ArrowForwardIcon = ArrowForward.default as unknown as React.ElementType;
const RocketLaunchIcon = RocketLaunch.default as unknown as React.ElementType;

import { Button } from '@mui/material';

type PlayButtonProps = {
    index: number;
    steps: any[];
    disabled: boolean;
    nextPage: string;
    onClick: () => void;
};

const PlayButton = ({ index, steps, disabled, nextPage, onClick }: PlayButtonProps) => {
    return (
        <Button
            variant='contained'
            size="large"
            sx={{
                position: 'fixed',
                bottom: 50,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1300,
            }}
            startIcon={index === -1 ? <RocketLaunchIcon /> : index === steps.length ? <ArrowForwardIcon /> : <PlayArrowIcon />}
            onClick={onClick}
            disabled={disabled}
        >
            {index === -1 ? "Start" : index === steps.length ? nextPage : "Next"}
        </Button>
    );
};

export default PlayButton;
