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
            return [15];
        case "-":
            return [17];
        case "(":
            return [19];
        case ")":
            return [24];
        default:
            if (isNumeric(character)) {
                return [8];
            } else {
                return [];
            }
    }
}

const States = () => {
    const { result, sign, expression } = useAlgoContext();
    return (
        <Stack spacing={2} direction="row">
            <AlgoClick />
            <Paper sx={{ padding: "8px 16px", borderRadius: 10 }} variant="outlined">
                <Typography variant="body2" display="inline">
                    INPUT:&nbsp;
                </Typography>
                <Typography variant="body2" display="inline">
                    {expression}
                </Typography>
            </Paper>
            <Paper sx={{ padding: "8px 16px", borderRadius: 10 }} variant="outlined">
                <Typography variant="body2" display="inline">
                    RESULT:&nbsp;
                </Typography>
                <Typography variant="body2" display="inline" color="primary">
                    {result}
                </Typography>
            </Paper>
            <Paper sx={{ padding: "8px 16px", borderRadius: 10 }} variant="outlined">
                <Typography variant="body2" display="inline">
                    SIGN:&nbsp;
                </Typography>
                <Typography variant="body2" display="inline" color="primary">
                    {sign}
                </Typography>
            </Paper>
        </Stack>
    )
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
                </Stack>
            </AccordionSummary>

            <AccordionDetails>
                <Stack direction="column" spacing={2}>
                    <States />
                    <AlgoExpression />
                </Stack>
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
    top: 20
}));

const Main = () => (
    <Position>
        <AlgoCode />
    </Position>
);

export default Main;
