import React from "react";
import { Button, Chip, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import InputOutlinedIcon from '@mui/icons-material/InputOutlined';
import OutputOutlinedIcon from '@mui/icons-material/OutputOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import TipsAndUpdatesTwoToneIcon from '@mui/icons-material/TipsAndUpdatesTwoTone';
import CodeIcon from '@mui/icons-material/Code';
import CodeBlock, { languages } from '../../dp/_components/CodeBlock';
import { useAlgoContext } from "./AlgoContext";
import { State } from "./AlgoState";
import Title from "./Title";
import { Item } from "./greedyAlgo";
import Introduction from "./Introduction";
import { HardcodeSolution } from "./contents";
import { CheckCircleOutline } from "@mui/icons-material";
import { title } from "./contents";

const thousands = ["", "M", "MM", "MMM"];
const hundreds = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
const tens = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
const ones = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

interface TableProps {
    name: string;
    romans: string[];
    enabled: number;
}

const Romans = ({ name, romans, enabled }: TableProps) => {
    const enblaedStyle = { background: "green", color: "#FFF" };
    const normalStyle = {};

    const getStyle = (i: number) => (i === enabled) ? enblaedStyle : normalStyle;
    return (
        <Table sx={{ width: "100%" }}>
            <TableHead>
                <TableRow>
                    <TableCell colSpan={romans.length + 1} padding="none" sx={{ border: "none" }}>
                        {name}
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell padding="none">Value</TableCell>
                    {
                        romans.map((_, i) => <TableCell key={i} padding="none" style={getStyle(i)}>{i}</TableCell>)
                    }
                </TableRow>
                <TableRow>
                    <TableCell padding="none">Symbol</TableCell>
                    {
                        romans.map((roman, i) => <TableCell key={i} padding="none" style={getStyle(i)}>{roman || '""'}</TableCell>)
                    }
                </TableRow>
            </TableBody>
        </Table>
    )
}

const Main = () => {

    const { index, value, setIndex, setState, result, state } = useAlgoContext();

    let height = window.innerHeight * 0.8;

    let last = result[result.length - 1];
    let output: string = (last && last.next.roman) || "";

    const thousand = ~~(value / 1000);
    const thousandsCode = `thousands = num / 1000 = ${value} / 1000 = ${thousand}`

    const hundred = ~~(value % 1000 / 100);
    const hundredsCode = `hundreds = num % 1000 / 100 = ${value} % 1000 / 100 = ${hundred}`

    const ten = ~~(value % 100 / 10);
    const tensCode = `tens = num % 100 / 10 = ${value} % 100 / 10 = ${ten}`

    const one = ~~(value % 10);
    const onesCode = `ones = num % 10 = ${value} % 10 = ${one}`

    const roman = thousands[thousand] + hundreds[hundred] + tens[ten] + ones[one];
    const romanCode = `thousands[${thousand}] + hundreds[${hundred}] + tens[${ten}] + ones[${one}] = ${roman}`;

    return (
        <Stack sx={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "60px" }} spacing={1}>
            <Stack direction="row" spacing={2}>
                <Typography
                    display="flex"
                    sx={{
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    {title} {state === State.Finished && <CheckCircleOutline sx={{ color: 'green' }} />}
                </Typography>
                <Chip variant="outlined" icon={<TipsAndUpdatesTwoToneIcon />} label="Hardcode Solution" />
            </Stack>

            <Stack spacing={1}>
                <Romans name="Thousands" romans={thousands} enabled={thousand} />
                <CodeBlock
                    code={thousandsCode}
                    language={languages.Typescript}
                    wrapLines={true}
                />
                <Romans name="Hundreds" romans={hundreds} enabled={hundred} />
                <CodeBlock
                    code={hundredsCode}
                    language={languages.Typescript}
                    wrapLines={true}
                />
                <Romans name="Tens" romans={tens} enabled={ten} />
                <CodeBlock
                    code={tensCode}
                    language={languages.Typescript}
                    wrapLines={true}
                />

                <Romans name="Ones" romans={ones} enabled={one} />
                <CodeBlock
                    code={onesCode}
                    language={languages.Typescript}
                    wrapLines={true}
                />

                <CodeBlock
                    code={romanCode}
                    language={languages.Typescript}
                    wrapLines={true}
                />
            </Stack>
        </Stack>
    )
}

const Play = () => {
    const { state } = useAlgoContext();

    return (
        <>  <Introduction code={HardcodeSolution} />
            {state !== State.Typing && <Main />}
        </>
    );
}

export default Play;
