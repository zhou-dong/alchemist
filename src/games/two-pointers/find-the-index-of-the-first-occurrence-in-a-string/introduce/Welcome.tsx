import { Stack, Typography } from '@mui/material';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';

const Icon = () => (
    <SentimentSatisfiedOutlinedIcon
        sx={{
            fontSize: 60,
            color: 'gold',
            animation: 'bounce 1.5s ease infinite',
            '@keyframes wobble': {
                '0%': { transform: 'rotate(0deg)' },
                '15%': { transform: 'rotate(10deg)' },
                '30%': { transform: 'rotate(-10deg)' },
                '45%': { transform: 'rotate(7deg)' },
                '60%': { transform: 'rotate(-7deg)' },
                '75%': { transform: 'rotate(3deg)' },
                '100%': { transform: 'rotate(0deg)' },
            },
            '@keyframes bounce': {
                '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                '40%': { transform: 'translateY(-10px)' },
                '60%': { transform: 'translateY(-10px)' },
            }
        }}
    />
);

const Welcome = () => (
    <Stack
        direction="column"
        spacing={4}
        sx={{
            padding: '40px',
            margin: '40px',
            borderRadius: '15px',
            boxShadow: 4,
            position: 'fixed', 
            top: '40%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
        }}
        textAlign="center"
    >
        <Stack
            direction="row"
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Typography variant="h4" sx={{ color: "#000" }}>
                Welcome to the String Search Adventure!
            </Typography>
            <Icon />
        </Stack>

        <Typography sx={{ color: "#000" }}>
            You will learn how to find the index of the first occurrence of a substring in a string using an efficient algorithm.

            Whether you're a newbie or a coding wizard, this guide is crafted just for you! Let's dive in! 🚀
        </Typography>
    </Stack>
);

export default Welcome;
