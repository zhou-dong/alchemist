import { Accordion, AccordionDetails, AccordionSummary, Paper, Stack, Typography } from '@mui/material';
import * as React from 'react';
import CodeIcon from '@mui/icons-material/Code';
import { styled } from '@mui/material/styles';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CodeBlock, { languages } from '../../dp/_components/CodeBlock';
import { shortFormula } from "./contents";
import { useAlgoContext } from "./AlgoContext";
import { State } from "./AlgoState";
import AlgoExpression from "./AlgoExpression";
import AlgoClick from './AlgoClick';
import info from "./info";

function isNumeric(n: string) {
    const value = parseInt(n);
    return !isNaN(value) && isFinite(value);
}

const getHighLightLineNumber = (index: number, expression: string, state: State): number[] => {
    if (state === State.Typing || state === State.Finished) {
        return [];
    }
    const character = expression.charAt(index);

    switch (character) {
        case "+":
            return [14];
        case "-":
            return [16];
        case "(":
            return [18];
        case ")":
            return [23];
        default:
            if (isNumeric(character)) {
                return [7];
            } else {
                return [];
            }
    }
}

const States = () => {
    const { result, sign } = useAlgoContext();
    return (
        <Stack spacing={2} direction="row" sx={{ marginTop: "10px" }}>
            <AlgoClick />
            <Paper sx={{ padding: "10px 16px", borderRadius: 10 }} variant="outlined">
                <Typography variant="body2" display="inline">
                    RESULT:&nbsp;
                </Typography>
                <Typography variant="body2" display="inline" color="primary">
                    {result}
                </Typography>
            </Paper>
            <Paper sx={{ padding: "10px 16px", borderRadius: 10 }} variant="outlined">
                <Typography variant="body2" display="inline">
                    SIGN :&nbsp;&nbsp;&nbsp;&nbsp;
                </Typography>
                <Typography variant="body2" display="inline" color="primary">
                    {sign}
                </Typography>
            </Paper>
        </Stack>
    )
}

const Output = () => {
    const { result } = useAlgoContext();
    return (
        <Paper sx={{ padding: "8px 16px", borderRadius: 10 }} variant="outlined">
            <Typography variant="body2" display="inline">
                OUTPUT:&nbsp;
            </Typography>
            <Typography variant="body2" display="inline" color="primary">
                {result}
            </Typography>
        </Paper>
    );
}

const Input = () => {
    const { expression } = useAlgoContext();
    return (
        <Paper sx={{ padding: "8px 16px", borderRadius: 10 }} variant="outlined">
            <Typography variant="body2" display="inline">
                INPUT: {expression}
            </Typography>
        </Paper>
    );
}

const AlgoCode = () => {

    const { index, expression, state } = useAlgoContext();

    const [highLightLine, setHighLightLine] = React.useState<number[]>([]);
    React.useEffect(() => {
        setHighLightLine(() => getHighLightLineNumber(index, expression, state));
    }, [index, expression, state]);

    const [expanded, setExpanded] = React.useState(false);
    const handleChange = () => { setExpanded(!expanded) };
    React.useEffect(() => {
        if (state === State.Typing || state === State.Finished) {
            setExpanded(false);
        }
        if (state === State.Playing) {
            setExpanded(true);
        }
    }, [state]);

    const DisplayCodeIcon = () => {
        if (state === State.Finished) {
            return (<CheckCircleOutlineOutlinedIcon color='primary' />);
        } else {
            return (<CodeIcon fontSize="medium" />);
        }
    }

    return (
        <Accordion expanded={expanded} onChange={handleChange} sx={{ zIndex: 0 }}>
            <AccordionSummary>
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                    <DisplayCodeIcon />
                    <Typography variant='subtitle1'>{info.name}</Typography>
                    <Input />
                    {state === State.Finished && <Output />}
                </Stack>
            </AccordionSummary>

            <AccordionDetails>
                <AlgoExpression />
                <States />
                <CodeBlock
                    code={shortFormula}
                    language={languages.Typescript}
                    showLineNumbers={true}
                    linesToHighlight={highLightLine}
                    wrapLines={true}
                />
            </AccordionDetails>
        </Accordion>
    );
}

const Position = styled("div")(() => ({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    position: "fixed",
    top: 120
}));

const Main = () => (
    <Position>
        <AlgoCode />
    </Position>
);

export default Main;
