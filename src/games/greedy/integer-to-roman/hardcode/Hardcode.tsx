import { Chip, Paper, Stack, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import CodeBlock, { languages } from '../../../dp/_components/CodeBlock';
import { useAlgoContext } from "./AlgoContext";
import { State } from "../_common/AlgoState";
import Introduction from "./Introduction";
import { HardcodeSolution } from "../_common/contents";
import { CheckCircleOutline } from "@mui/icons-material";
import { title } from "../_common/contents";

const thousands = ["", "M", "MM", "MMM"];
const hundreds = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
const tens = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
const ones = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

interface TableProps {
    name: string;
    romans: string[];
    enabled: number;
    code: string;
}

const Romans = ({ name, romans, enabled, code }: TableProps) => {
    const enblaedStyle = { background: "green", color: "#FFF" };
    const normalStyle = {};
    const getStyle = (i: number) => (i === enabled) ? enblaedStyle : normalStyle;
    return (
        <Stack spacing={0}>
            <Table sx={{ width: "100%", maxWidth: "1000px" }}>
                <TableBody>
                    <TableRow>
                        <TableCell padding="none">{name}</TableCell>
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

            <div style={{ marginTop: "-10px" }}>
                <CodeBlock
                    code={code}
                    language={languages.Typescript}
                    wrapLines={true}
                />
            </div>
        </Stack>
    )
}

const Main = () => {

    const { input, state } = useAlgoContext();

    const thousand = ~~(input / 1000);
    const thousandSymbol = thousands[thousand];
    const thousandsCode = `thousands = num / 1000 = ${input} / 1000 = ${thousand} = ${thousandSymbol}`;

    const hundred = ~~(input % 1000 / 100);
    const hundredSymbol = hundreds[hundred];
    const hundredsCode = `hundreds = num % 1000 / 100 = ${input} % 1000 / 100 = ${hundred} = ${hundredSymbol}`;

    const ten = ~~(input % 100 / 10);
    const tenSymbol = tens[ten];
    const tensCode = `tens = num % 100 / 10 = ${input} % 100 / 10 = ${ten} = ${tenSymbol}`;

    const one = ~~(input % 10);
    const oneSymbol = ones[one];
    const onesCode = `ones = num % 10 = ${input} % 10 = ${one} = ${oneSymbol}`;

    const roman = thousandSymbol + hundredSymbol + tenSymbol + oneSymbol;
    const expressions = `thousands[${thousand}] + hundreds[${hundred}] + tens[${ten}] + ones[${one}]`;
    const symbols = `${thousandSymbol} + ${hundredSymbol} + ${tenSymbol} + ${oneSymbol}`;
    const romanCode = `Roman = ${expressions} = ${symbols} = ${roman}`;

    return (
        <Stack sx={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "60px" }} spacing={3}>
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
                <Chip variant="outlined" icon={<TipsAndUpdatesOutlinedIcon />} label="Hardcode Solution" />
            </Stack>

            <Stack spacing={2}>
                <Romans name="Thousand" romans={thousands} enabled={thousand} code={thousandsCode} />
                <Romans name="Hundred" romans={hundreds} enabled={hundred} code={hundredsCode} />
                <Romans name="Ten" romans={tens} enabled={ten} code={tensCode} />
                <Romans name="One" romans={ones} enabled={one} code={onesCode} />

                <Paper variant="outlined" sx={{ border: "1px solid gray" }}>
                    <CodeBlock
                        code={romanCode}
                        language={languages.Typescript}
                        wrapLines={true}
                    />
                </Paper>
            </Stack>
        </Stack>
    )
}

const Play = () => {
    const { state } = useAlgoContext();
    return (
        <>
            <Introduction code={HardcodeSolution} />
            {state !== State.Typing && <Main />}
        </>
    );
}

export default Play;
