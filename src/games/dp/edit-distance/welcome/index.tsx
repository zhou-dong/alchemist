import { IconButton, Stack, styled, Typography } from '@mui/material';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import { green } from '@mui/material/colors';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useAlgoContext } from '../AlgoContext';
import Title from '../description/Title';
import Toolbox from '../toolbox';
import { State } from '../AlgoState';

const Icon = () => (
    <SentimentSatisfiedOutlinedIcon
        sx={{
            fontSize: 60,
            color: green[400],
            animation: 'wobble 1.5s ease infinite',
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
            <Typography variant="h5">
                Welcome to Algorithm Learning Adventure!
            </Typography>
        </Stack>

        <Typography>
            Here, you'll learn how the Edit Distance (Levenshtein Distance) algorithm works using <b>dynamic programming</b>.
        </Typography>

        <Typography>
            Whether you're new to the concept or just need a refresher, you're in the right place!
        </Typography>
    </Stack>
);

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    width: 60,
    height: 60,
    border: "1px solid lightgray",
    color: theme.palette.primary.main,
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        color: "#fff",
    },
    '&.Mui-disabled': {
        backgroundColor: 'lightgray',
        color: 'gray',
    },
}));

const Location = styled("div")({
    position: 'fixed',
    top: '40%',
    left: "50%",
    transform: "translate(-50%,-40%)",
});

const Main = () => {
    const { state, setState } = useAlgoContext();

    const handleClick = () => {

        console.log(state, "state");

        setState(State.Description);
    }

    return (
        <>
            <Toolbox current={State.Welcome} />
            <Location>
                <Stack
                    spacing={4}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Title displayStar={false} />
                    <Welcome />
                    <div></div>
                    <StyledIconButton onClick={handleClick}>
                        <NavigateNextIcon fontSize='large' />
                    </StyledIconButton>
                </Stack>
            </Location>
        </>
    );
}

export default Main;
