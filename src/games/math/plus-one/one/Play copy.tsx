import React from "react";
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

const Main = () => {

    const { index, value, setIndex, setState, state } = useAlgoContext();

    const [linesToHighlight, setLinesToHighlight] = React.useState<number[]>([]);

    // React.useEffect(() => {
    //     if (state === State.Typing) {
    //         setLinesToHighlight([]);
    //         return;
    //     }

    //     const item = result[index];
    //     if (!item) {
    //         return;
    //     }

    //     setLinesToHighlight(() => item.data.linesToHighlight);

    // }, [index, result, state]);

    return (
        <Grid container sx={{ width: "80%", margin: "auto", marginTop: "20px" }}>
            <Grid item md={7} xs={12}>
                <CodeDisplay linesToHighlight={linesToHighlight} />
            </Grid>

            <Grid item md={5} xs={12}>
                <Stack sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", direction: "row" }} spacing={2}>
                    <div style={{ marginTop: "40px" }} />
             
                    <Divider sx={{ width: "90%" }} />

                    <InputDisplay index={index} value={value+""} />
                    <div style={{ marginBottom: "10px" }} />

                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell padding="none">Index</TableCell>
                                <TableCell padding="none">{index}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell padding="none">Sign</TableCell>
                                {/* <TableCell padding="none">{result[index - 1] && result[index - 1].data.sign}</TableCell> */}
                            </TableRow>

                            <TableRow>
                                <TableCell padding="none">Num</TableCell>
                                {/* <TableCell padding="none">{result[index - 1] && result[index - 1].data.num}</TableCell> */}
                            </TableRow>
                        </TableBody>
                    </Table>

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
        </Grid>
    )
}

const Play = () => {
    const { state } = useAlgoContext();

    return (
        <>
            {state !== State.Typing && <Main />}
        </>
    );
}

export default Play;
