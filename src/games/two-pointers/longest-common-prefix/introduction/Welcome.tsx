import { Stack, Typography } from '@mui/material';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import { green } from '@mui/material/colors';

const Icon = () => (
    <SentimentSatisfiedOutlinedIcon
        sx={{
            fontSize: 60,
            color: green[400],
            animation: 'bounce 1.5s ease-in-out infinite',
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
        spacing={2}
        sx={{
            padding: '40px',
            borderRadius: '15px',
            boxShadow: 4,
            position: 'fixed',
            top: '33%',
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
            <Icon />
            <Typography variant="h4">
                Welcome to the String Search Adventure!
            </Typography>
        </Stack>

        <Typography>
            Whether you're a beginner trying to understand the basic concepts of string manipulation or
            an experienced developer looking for efficient algorithms, you're in the right place.
        </Typography>

        <Typography>
            This problem has a wide range of applications, particularly in string matching,
            file directory traversal, DNA sequence comparison, and more.
        </Typography>
    </Stack>
);

export default Welcome;
