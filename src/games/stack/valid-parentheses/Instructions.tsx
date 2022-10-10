import * as React from 'react';
import { Paper, Popover, PopoverOrigin, Typography } from '@mui/material';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import RemoveFromQueueIcon from '@mui/icons-material/RemoveFromQueue';
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';

interface Props {
    anchorEl: HTMLElement | null;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    anchorOrigin: PopoverOrigin;
    transformOrigin: PopoverOrigin;
}

export default function Instructions({ anchorEl, setAnchorEl, anchorOrigin, transformOrigin }: Props) {

    const open = Boolean(anchorEl);
    const handleOnClose = () => { setAnchorEl(null) };

    return (
        <Popover
            anchorEl={anchorEl}
            open={open}
            onClose={handleOnClose}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
        >
            <Paper sx={{ padding: 2 }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}>
                    <Typography>Use&nbsp;</Typography>
                    <AddToQueueIcon />
                    <Typography>&nbsp;to add parenthesis to stack.</Typography>
                </div>
                <div style={{
                    marginTop: 10,
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}>
                    <Typography>Use&nbsp;</Typography>
                    <RemoveFromQueueIcon />
                    <Typography>&nbsp;to remove parenthesis from stack.</Typography>
                </div>
                <div style={{
                    marginTop: 10,
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}>
                    <Typography>Use&nbsp;</Typography>
                    <DangerousOutlinedIcon />
                    <Typography>&nbsp;to identify the invalid parentheses.</Typography>
                </div>
            </Paper>
        </Popover>
    )
}
