import React from "react";
import { styled } from '@mui/system';
import { Button, ButtonGroup, Chip, Divider, Grid, Paper, Stack, Table, TableBody, TableCell, TableRow, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

import CodeBlock, { languages } from '../../../dp/_components/CodeBlock';
import { useAlgoContext } from "./AlgoContext";
import { State } from "./AlgoState";
import { Item, Action } from "./algo";

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

const InputDisplay: React.FC<{ index: number, value: string }> = ({ index, value }) => (
    <Stack direction="column" spacing={1} sx={{ alignItems: "center" }}>
        <Chip label="Input String" variant="outlined" />

        <ToggleButtonGroup>
            {
                value.split("").map((char, i) => (
                    <ToggleButton
                        key={i}
                        value={char}
                        sx={{ height: "45px", width: "45px", fontWeight: "500" }}
                        selected={i === index}
                        color="primary"
                    >
                        {char}
                    </ToggleButton>
                ))
            }
        </ToggleButtonGroup>
    </Stack>
);

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

const ActionButton: React.FC<{
    name: string,
    startIcon: React.ReactNode,
    onClick: (item: Item) => boolean,
}> = ({ name, startIcon, onClick }) => {

    type ColorType = "primary" | "error"

    const { index } = useAlgoContext();
    const [color, setColor] = React.useState<ColorType>("primary");

    const handleOnClick = () => {

    }

    return (
        <Button startIcon={startIcon} onClick={handleOnClick} sx={{ color: "#FFF" }} color={color}>
            <Typography sx={{ flex: 1 }}>
                {name}
            </Typography>
        </Button>
    );
}

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
}

const Digits = () => {
    const { index, value, carrier, digits } = useAlgoContext();


    return (
        <Table>
            <TableBody>
                <TableRow>
                    {
                        (value + "").split("").map((num, i) =>
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

                <TableRow>
                    {
                        digits.map((num, i) =>
                            <TableCell key={i} padding="none">
                                {num}
                            </TableCell>
                        )
                    }
                </TableRow>
            </TableBody>
        </Table>
    );
}

const Main = () => {

    const { index, value, setIndex, setState, state, carrier, temp, digit } = useAlgoContext();

    const [linesToHighlight, setLinesToHighlight] = React.useState<number[]>([]);

    return (
        <Grid container sx={{ width: "80%", margin: "auto", marginTop: "20px" }}>


            <Grid item md={6} xs={12}>
                <Stack sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", direction: "row" }} spacing={2}>


                    {/* <Divider sx={{ width: "90%" }} /> */}

                    {/* <InputDisplay index={index} value={value} /> */}
                    {/* <div style={{ marginBottom: "10px" }} /> */}
                    <Digits />
                    <Dashboard />

                    <div style={{ marginBottom: "10px" }} />

                    <ButtonGroup orientation="vertical" size="large" variant="contained" disabled={state !== State.Playing}>

                        <ActionButton
                            name="Remove Whitespace"
                            startIcon={<RemoveCircleOutlineOutlinedIcon />}
                            onClick={(item) => {
                                if (item.action === Action.RemoveSpace) {
                                    setIndex(i => i + 1);
                                    return true;
                                } else {
                                    return false;
                                }
                            }}
                        />

                        <ActionButton
                            name="Assign Sign (1/-1)"
                            startIcon={<HelpOutlineIcon />}
                            onClick={(item) => {
                                if (item.action === Action.AssignSign) {
                                    setIndex(i => i + 1);
                                    return true;
                                } else {
                                    return false;
                                }
                            }}
                        />

                        <ActionButton
                            name="Non-digit Character"
                            startIcon={<ErrorOutlineIcon />}
                            onClick={(item) => {
                                if (item.action === Action.NonDigitCharacter) {
                                    setIndex(i => i + 1);
                                    setState(State.Finished);
                                    return true;
                                } else {
                                    return false;
                                }
                            }}
                        />

                        <ActionButton
                            name="greater than max"
                            startIcon={<KeyboardDoubleArrowUpIcon />}
                            onClick={(item) => {
                                if (item.action === Action.BiggerThanMax) {
                                    setState(State.Finished);
                                    setIndex(i => i + 1);
                                    return true;
                                } else {
                                    return false;
                                }
                            }}
                        />

                        <ActionButton
                            name="less than min"
                            startIcon={<KeyboardDoubleArrowDownIcon />}
                            onClick={(item) => {
                                if (item.action === Action.LessThanMin) {
                                    setIndex(i => i + 1);
                                    setState(State.Finished);
                                    return true;
                                } else {
                                    return false;
                                }
                            }}
                        />

                        <ActionButton
                            name="num * 10 + digit"
                            startIcon={<HighlightOffOutlinedIcon />}
                            onClick={(item) => {
                                if (item.action === Action.Accumulate) {
                                    setIndex(i => i + 1);
                                    return true;
                                } else {
                                    return false;
                                }
                            }}
                        />

                        <ActionButton
                            name="Num * Sign"
                            startIcon={<HighlightOffOutlinedIcon />}
                            onClick={(item) => {
                                if (item.action === Action.NumMultiplySign) {
                                    setIndex(i => i + 1);
                                    setState(State.Finished);
                                    return true;
                                } else {
                                    return false;
                                }
                            }}
                        />
                    </ButtonGroup>
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
    top: 80,
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
