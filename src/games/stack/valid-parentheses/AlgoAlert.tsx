import React from "react";
import { Alert, AlertTitle, Popover } from "@mui/material";

export interface AlgoAlertContent {
    title: string;
    message: string;
}

interface MessageProps {
    content: AlgoAlertContent;
    anchorEl: HTMLElement | null;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const AlgoAlert = ({ content, anchorEl, setAnchorEl }: MessageProps) => {

    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'center',
            }}
        >
            <Alert
                variant="filled"
                severity="error"
                onClose={handleClose}
            >
                <AlertTitle>{content.title}</AlertTitle>
                {content.message}
            </Alert>
        </Popover>
    );
}

export default AlgoAlert;
