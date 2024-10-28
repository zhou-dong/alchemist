import { Stack, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';

const Icon = () => (
    <SentimentSatisfiedOutlinedIcon
        sx={{
            fontSize: 60,
            color: 'yellow',
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
        direction="row"
        sx={{
            padding: '15px',
            borderRadius: '15px',
            backgroundColor: green[600],
            boxShadow: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        <Icon />
        <Typography variant="h4" sx={{ color: "#fff" }}>
            Welcome to the String Search Adventure!
        </Typography>
    </Stack>
);

export default Welcome;
