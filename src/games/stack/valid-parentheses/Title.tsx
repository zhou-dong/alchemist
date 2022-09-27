import * as React from 'react';
import Box from '@mui/material/Box';
import info from "./info";
import { Typography } from '@mui/material';

export default function Title() {
    return (
        <Box sx={{
            position: "fixed",
            top: 40,
            flexGrow: 1,
            width: "100%",
            display: 'flex',
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Typography>
                {info.name}
            </Typography>
        </Box>
    );
}
