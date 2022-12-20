import React from "react";
import { Button, Chip, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import InputOutlinedIcon from '@mui/icons-material/InputOutlined';
import OutputOutlinedIcon from '@mui/icons-material/OutputOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import { useAlgoContext } from "./AlgoContext";
import { State } from "./AlgoState";
import Title from "./Title";
import { Item } from "./greedyAlgo";
import Introduction from "./Introduction";
import { GreedySolution } from "./contents";

const valueSymbols = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"]
];

const Roman: React.FC<{ enabled: boolean, value: number, symbol: string }> = ({ enabled, value, symbol }) => (
    <TableRow>
        <TableCell padding="none" sx={{ border: "none" }}>
            {enabled ? <CircleIcon color="success" /> : <CircleOutlinedIcon />}
        </TableCell>
        <TableCell padding="none">
            {value}
        </TableCell>
        <TableCell padding="none" sx={{ "fontWeight": "bold" }}>
            {symbol}
        </TableCell>
    </TableRow>
);

const Romans: React.FC<{ result: Item[], index: number }> = ({ result, index }) => {
    const itemIndex: number = (result[index] && result[index].index) || 0;
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell padding="none" sx={{ border: "none" }} />
                    <TableCell padding="none">
                        Value
                    </TableCell>
                    <TableCell padding="none">
                        Symbol
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    valueSymbols.map(([value, symbol], i) =>
                        <Roman enabled={i === itemIndex} value={+value} symbol={symbol + ""} key={i} />
                    )
                }
            </TableBody>
        </Table>
    );
}

const InputDisplay: React.FC<{ input: number, output: string }> = ({ input, output }) => (
    <Stack direction="row" spacing={2}>
        <Chip variant="outlined" icon={<TipsAndUpdatesOutlinedIcon />} label="Greedy Algorithm" />
        <Chip variant="outlined" icon={<InputOutlinedIcon />} label={input} />
        <Chip variant="outlined" icon={<OutputOutlinedIcon />} label={output} />
    </Stack>
);

const Steps: React.FC<{ result: Item[], index: number }> = ({ result, index }) => {

    const enblaedStyle = { background: "green", color: "#FFF" };
    const normalStyle = {};

    const Row: React.FC<{ item: Item, i: number }> = ({ item, i }) => {
        const style = (i === index) ? enblaedStyle : normalStyle;
        return (
            <TableRow>
                <TableCell padding="none" sx={style}>
                    {item.current.num} - {item.roman.value} = {item.next.num}
                </TableCell>
                <TableCell padding="none" sx={style}>
                    {item.current.roman || '""'} + {item.roman.symbol} = {item.next.roman}
                </TableCell>
            </TableRow>
        );
    }

    return (
        <Table sx={{ width: "70%" }}>
            <TableHead>
                <TableRow>
                    <TableCell padding="none">
                        num = num - value
                    </TableCell>
                    <TableCell padding="none">
                        roman = roman + symbol
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    result.map((item, i) => <Row item={item} key={i} i={i} />)
                }
            </TableBody>
        </Table>
    )
}

const Main = () => {

    const { index, value, setIndex, setState, result, state } = useAlgoContext();

    const Num = () => {

        const item = result[index];

        if (!item) {
            return (<></>);
        }

        return (
            <TableRow>
                <TableCell padding="none">
                    num
                </TableCell>
                <TableCell padding="none">
                    num = num - value
                </TableCell>
                <TableCell padding="none">
                    num = {item.current.num} - {item.roman.value}
                </TableCell>
                <TableCell padding="none">
                    num = {item.next.num}
                </TableCell>
            </TableRow>
        )
    }

    const Roman = () => {

        const item = result[index];

        if (!item) {
            return (<></>);
        }
        return (
            <TableRow>
                <TableCell padding="none">
                    roman
                </TableCell>
                <TableCell padding="none">
                    roman = roman + symbol
                </TableCell>
                <TableCell padding="none">
                    roman = {item.current.roman || '""'} + {item.roman.symbol}
                </TableCell>
                <TableCell padding="none">
                    roman = {item.next.roman}
                </TableCell>
            </TableRow>
        )
    }

    let height = window.innerHeight * 0.8;

    let last = result[result.length - 1];
    let output: string = (last && last.next.roman) || "";

    return (
        <Grid container sx={{ width: "80%", margin: "auto" }}>
            <Grid item md={5} xs={12} sx={{ height, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Romans result={result} index={index} />
            </Grid>

            <Grid item md={7} xs={12}>
                <Stack sx={{ height, display: "flex", alignItems: "center", justifyContent: "center", direction: "row" }} spacing={2}>
                    <Title />
                    <InputDisplay input={value} output={output} />

                    <Steps result={result} index={index} />

                    <Table sx={{ width: "70%" }}>
                        <TableBody>
                            <Num />
                            <Roman />
                        </TableBody>
                    </Table>

                    {/* <div style={{ marginBottom: "10px" }} /> */}

                    <Button
                        disabled={state !== State.Playing}
                        startIcon={<ArrowCircleRightOutlinedIcon />}
                        variant="contained"
                        onClick={() => {
                            if (index === result.length - 1) {
                                setState(State.Finished);
                            } else {
                                setIndex(i => i + 1)
                            }
                        }}>
                        next
                    </Button>

                </Stack>
            </Grid>
        </Grid >
    )
}

const Play = () => {
    const { state } = useAlgoContext();

    return (
        <>
            <Introduction code={GreedySolution} />
            {state !== State.Typing && <Main />}
        </>
    );
}

export default Play;
