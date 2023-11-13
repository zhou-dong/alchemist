import { styled } from '@mui/system';
import { Grid, IconButton, Stack, Table, TableBody, TableCell, TableRow } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAlgoContext } from "./AlgoContext";
import { State } from "./AlgoState";
import DoneIcon from '@mui/icons-material/Done';


const Dashboard = () => {
    const { actions, index } = useAlgoContext();
    const action = actions[index];

    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell padding="none">carrier</TableCell>
                    <TableCell padding="none" sx={{ backgroundColor: "gold" }}>
                        {action?.left}
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell padding="none">temp</TableCell>
                    <TableCell padding="none" sx={{ backgroundColor: "white" }}>
                        {action?.right}
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell padding="none">digits[i]</TableCell>
                    <TableCell padding="none" sx={{ backgroundColor: "white" }}>
                        {action?.update}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

const Action = () => {

    const { setIndex, index, actions } = useAlgoContext();

    const disabled = (index >= actions.length);

    const handleOnClick = () => {
        setIndex(i => i + 1);
    }

    return (
        <IconButton size="medium" sx={{ border: "1px solid gray" }} color="success" disabled={disabled} onClick={handleOnClick}>
            {disabled ? <DoneIcon color='success' /> : <ArrowBackIcon />}
        </IconButton>
    );
}

const Main = () => (
    <Grid container sx={{ width: "80%", margin: "auto", }}>
        <Grid item md={6} xs={12} sx={{ marginTop: "40px" }}>
            <Stack
                sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                spacing={3}
                direction="column"
            >
                <Dashboard />
                <Action />
            </Stack>
        </Grid>
        <Grid item md={6} xs={12}>

        </Grid>
    </Grid>
);

const Position = styled("div")({
    position: "fixed",
    top: 200,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "40%",
    zIndex: 0
});

const Play = () => {
    const { state } = useAlgoContext();

    return (
        <Position>
            {state !== State.Typing && <Main />}
        </Position>
    );
}

export default Play;
