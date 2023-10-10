import React from "react";
import { styled } from '@mui/system';
import { Grid, IconButton, Paper, Stack, Table, TableBody, TableCell, TableRow } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CodeBlock, { languages } from '../../../dp/_components/CodeBlock';
import { useAlgoContext } from "./AlgoContext";
import { State } from "./AlgoState";

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

const CodeDisplay: React.FC<{ linesToHighlight: number[] }> = ({ linesToHighlight }) => (
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

const Dashboard = () => {
    const { carrier, temp, digit } = useAlgoContext();
    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell padding="none">carrier</TableCell>
                    <TableCell padding="none">{carrier}</TableCell>
                </TableRow>

                <TableRow>
                    <TableCell padding="none">temp</TableCell>
                    <TableCell padding="none">{temp}</TableCell>
                </TableRow>

                <TableRow>
                    <TableCell padding="none">digits[i]</TableCell>
                    <TableCell padding="none">{digit}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

const Digits = () => {
    const { index, carrier, digits } = useAlgoContext();

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
                        digits.map((num, i) =>
                            <TableCell key={i} padding="none" sx={{ border: "none" }}>
                                {i === index && carrier}
                            </TableCell>
                        )
                    }
                </TableRow>
            </TableBody>
        </Table>
    );
}

const Action: React.FC<{ setLinesToHighlight: React.Dispatch<React.SetStateAction<number[]>> }> = ({ setLinesToHighlight }) => {

    // const { index, value, setIndex, setState, state, carrier, temp, digit } = useAlgoContext();

    const disabled = false;

    return (
        <IconButton size="medium" sx={{ border: "1px solid gray" }} color="success" disabled={disabled}>
            <ArrowForwardIcon />
        </IconButton>
    )
}

const Main = () => {

    const [linesToHighlight, setLinesToHighlight] = React.useState<number[]>([3]);

    return (
        <Grid container sx={{ width: "80%", margin: "auto", }}>
            <Grid item md={6} xs={12} sx={{ marginTop: "40px" }}>
                <Stack
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        direction: "row"
                    }}
                    spacing={3}
                >
                    <Dashboard />
                    <Digits />
                    <Action setLinesToHighlight={setLinesToHighlight} />
                </Stack>
            </Grid>
            <Grid item md={6} xs={12}>
                <CodeDisplay linesToHighlight={linesToHighlight} />
            </Grid>
        </Grid>
    );
}

const Position = styled("div")({
    position: "fixed",
    top: 100,
    width: "100%",
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
