import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import info from "./info";

export default function Title() {
    return (
        <Box sx={{
            position: "fixed",
            top: 70,
            left: 20,
            flexGrow: 1,
            display: 'flex',
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Typography variant='subtitle1'>
                {info.name}
            </Typography>
        </Box>
    );
}
