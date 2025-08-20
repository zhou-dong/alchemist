import React from 'react';
import * as Mouse from '@mui/icons-material/Mouse';
import * as Done from '@mui/icons-material/Done';
import { Button } from '@mui/material';

const MouseIcon = Mouse.default as unknown as React.ElementType;
const DoneIcon = Done.default as unknown as React.ElementType;

type PlayButtonProps = {
    index: number;
    steps: any[];
    disabled: boolean;
    onClick: () => void;
};

const PlayButton = ({ index, steps, disabled, onClick }: PlayButtonProps) => (
    <Button
        variant='contained'
        size="large"
        sx={{
            position: 'fixed',
            bottom: 100,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1300,
        }}
        startIcon={index === steps.length ? <DoneIcon /> : <MouseIcon />}
        onClick={onClick}
        disabled={disabled}
    >
        {index === steps.length ? "Done" : "Next"}
    </Button>
);

export default PlayButton;
