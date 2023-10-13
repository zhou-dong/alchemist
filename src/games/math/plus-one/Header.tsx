import { styled } from '@mui/system';
import Switcher from "./Switcher";
import { Solution } from './Switcher';
import { Stack, Typography } from '@mui/material';
import { title } from "./description";

interface Props {
    solution: Solution;
    setSolution: React.Dispatch<React.SetStateAction<Solution>>;
}

const Position = styled("div")({
    position: "fixed",
    top: 40,
    width: "100%",
    zIndex: 1,
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
