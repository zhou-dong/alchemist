import Box from '@mui/material/Box';
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
            <Typography variant='h5'>
                Basic Calculator
            </Typography>
        </Box>
    );
}
