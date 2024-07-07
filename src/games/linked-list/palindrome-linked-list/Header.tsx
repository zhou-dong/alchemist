import { styled } from '@mui/system';
import { Typography } from '@mui/material';
import { title } from "./description";

const Position = styled("div")({
    position: "fixed",
    top: 40,
    zIndex: 0.12,
    left: "50%",
    transform: "translate(-50%)",
});

const Title = () => (
    <Typography variant='body1'>
        {title}
    </Typography>
);

const Main = () => (
    <Position>
        <Title />
    </Position>
);

export default Main;
