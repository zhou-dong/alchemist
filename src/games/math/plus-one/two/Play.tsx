import { styled } from '@mui/system';
import { IconButton, Paper, Stack, Table, TableBody, TableCell, TableRow } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CodeBlock, { languages } from '../../../dp/_components/CodeBlock';
import { useAlgoContext } from "./AlgoContext";
import { State } from "./AlgoState";
import DoneIcon from '@mui/icons-material/Done';

const formula = `function plusOne(digits: number[]): number[] {

    for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] !== 9) {
            digits[i] += 1;
            for (let j = i + 1; j < digits.length; j++) {
                digits[j] = 0;
            }
            return digits;
        }
    }

    const ans = new Array(digits.length + 1).fill(0);
    ans[0] = 1;
    return ans;
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

const Digits = () => {
    const { index, actions } = useAlgoContext();

    let action = actions[index];
    if (!action) {
        action = actions[actions.length - 1];
    }

    const { digits, i, j } = action;



    return (
        <Table>
            <TableBody>
                <TableRow>
                    {
                        digits.map((num, ii) =>
                            <TableCell key={ii} padding="none" sx={{ backgroundColor: (ii === i || ii === j) ? "gold" : "white" }}>
                                {num}
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
            {disabled ? <DoneIcon color='success' /> : <ArrowBackIcon />}
        </IconButton>
    );
}

const Main = () => (
    <Stack sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} spacing={3} direction="column">
        <CodeDisplay />
        <Digits />
        <Action />
    </Stack>
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
