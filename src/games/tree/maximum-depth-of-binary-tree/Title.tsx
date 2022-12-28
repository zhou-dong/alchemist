import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { title } from "./contents";

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
            <Typography variant='body1'>
                {title}
            </Typography>
        </Box>
    );
}
