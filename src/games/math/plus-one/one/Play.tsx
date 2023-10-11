import { styled } from '@mui/system';
import { Grid, IconButton, Paper, Stack, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CodeBlock, { languages } from '../../../dp/_components/CodeBlock';
import { useAlgoContext } from "./AlgoContext";
import { State } from "./AlgoState";
import DoneIcon from '@mui/icons-material/Done';

const formula = `function plusOne(digits: number[]): number[] {

    let carrier = 1;

    for (let i = digits.length - 1; i >= 0; i--) {
        const temp = digits[i] + carrier;
        digits[i] = temp % 10;
        carrier = Math.floor(temp / 10);
        if (carrier === 0) {
            return digits;
        }
    }

    digits.unshift(1);
    return digits;
};`;

const CodeDisplay = () => {
    const { index, actions } = useAlgoContext();
    const action = actions[index];
    const linesToHighlight = (!action) ? [] : action.linesToHighlight;

    return (
        <Paper>
            <CodeBlock
                code={formula}
                language={languages.Typescript}
                showLineNumbers={true}
                linesToHighlight={linesToHighlight}
                wrapLines={true}
            />
        </Paper>
    );
}

const Dashboard = () => {
    const { actions, index } = useAlgoContext();
    const action = actions[index];

    const highlightLine = action?.linesToHighlight[0]

    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell padding="none">carrier</TableCell>
                    <TableCell padding="none" sx={{ backgroundColor: (highlightLine === 8 || highlightLine === 3) ? "gold" : "white" }}>
                        {action?.carrier}
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell padding="none">temp</TableCell>
                    <TableCell padding="none" sx={{ backgroundColor: (highlightLine === 6) ? "gold" : "white" }}>
                        {action?.temp}
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell padding="none">digits[i]</TableCell>
                    <TableCell padding="none" sx={{ backgroundColor: (highlightLine === 7) ? "gold" : "white" }}>
                        {action?.digit}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

const Digits = () => {
    const { index, actions } = useAlgoContext();

    let action = actions[index];
    if (!action) {
        action = actions[actions.length - 1];
    }

    const { digits, carrier, i } = action;

    return (
        <Table>
            <TableBody>
                <TableRow>
                    {
                        digits.map((num, i) =>
                            <TableCell key={i} padding="none">
                                {num}
                            </TableCell>
                        )
                    }
                </TableRow>
                <TableRow>
                    {
                        digits.map((num, j) =>
                            <TableCell key={j} padding="none" sx={{ border: "none" }}>
                                {j === i && carrier}
                            </TableCell>
                        )
                    }
                </TableRow>
            </TableBody>
        </Table>
    );
}

const Action = () => {

    const { setIndex, index, actions } = useAlgoContext();

    const disabled = (index >= actions.length);

    const handleOnClick = () => {
        setIndex(i => i + 1);
    }

    return (
        <IconButton size="medium" sx={{ border: "1px solid gray" }} color="success" disabled={disabled} onClick={handleOnClick}>
            {disabled ? <DoneIcon color='success' /> : <ArrowForwardIcon />}
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
                <Digits />
                <Action />
            </Stack>
        </Grid>
        <Grid item md={6} xs={12}>
            <CodeDisplay />
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
