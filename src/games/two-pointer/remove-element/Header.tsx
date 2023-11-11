import { styled } from '@mui/system';
import { Stack, Typography } from '@mui/material';
import Switcher, { Solution } from "./Switcher";
import { title } from "./description";

interface Props {
    solution: Solution;
    setSolution: React.Dispatch<React.SetStateAction<Solution>>;
}

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

const Main = ({ solution, setSolution }: Props) => (
    <Position>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center", justifyContent: "center" }}>
            <Title />
            <Switcher solution={solution} setSolution={setSolution} />
        </Stack>
    </Position>
);

export default Main;
