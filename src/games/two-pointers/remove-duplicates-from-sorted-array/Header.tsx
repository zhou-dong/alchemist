import { styled } from '@mui/system';
import { Stack, Typography } from '@mui/material';
import { title } from "./description";

const Position = styled("div")({
    position: "fixed",
    top: 40,
    zIndex: 1,
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
        <Stack direction="row" spacing={2} sx={{ alignItems: "center", justifyContent: "center" }}>
            <Title />
        </Stack>
    </Position>
);

export default Main;
