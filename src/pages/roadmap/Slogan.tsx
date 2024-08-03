import { Typography, Box } from '@mui/material';

const Slogan = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'column', md: "row" }, // Stack vertically on small screens, horizontally on larger screens
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                textAlign: 'center',
            }}
        >
            <Typography
                variant="h5"
                component="h1"
                sx={{
                    margin: '5px',
                    color: 'primary.main',
                    fontWeight: 300
                }}
            >
                See the Logic
            </Typography>
            <Typography
                variant="h6"
                component="h2"
                sx={{
                    margin: '5px',
                    color: 'text.primary',
                    fontWeight: 300,
                    // fontStyle: 'italic'
                }}
            >
                - The Intuitive Way to Learn Algorithms
            </Typography>
        </Box>
    );
};

export default Slogan;