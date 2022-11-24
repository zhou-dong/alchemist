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

const getHighLightLineNumber = (index: number, expression: string, state: State, prevSign: string): number[] => {
    if (state === State.Typing) {
        return [];
    }

    if (state === State.Finished) {
        return [25];
    }

    if (index === expression.length) {
        return [25];
    }

    const character = expression.charAt(index);
    if (isNumeric(character)) {
        switch (prevSign) {
            case "+":
                return [12];
            case "-":
                return [14];
            case "*":
                return [16];
            case "/":
                return [18];
        }
    } else if (character !== "_") {
        return [21];
    }

    return [];
}

const States = () => {
    const { prevSign } = useAlgoContext();
    return (
        <Stack spacing={2} direction="row" sx={{ marginTop: "10px" }}>
            <AlgoClick />
            <Paper sx={{ padding: "0px 16px", borderRadius: 10, display: "flex", alignItems: "center" }} variant="outlined">
                <Typography variant="body1" display="inline">
                    Previous Sign:&nbsp;&nbsp;&nbsp;
                </Typography>
                <Typography variant="h6" display="inline" color="primary">
                    {prevSign}
                </Typography>
            </Paper>
        </Stack>
    )
}

const Output = () => {
    const { result } = useAlgoContext();
    return (
        <Paper sx={{ padding: "0px 10px", borderRadius: 10, display: "flex", alignItems: "center", height: "100%" }} variant="outlined">
            <Typography variant="body2" display="inline">
                Output:&nbsp;
            </Typography>
            <Typography variant="body1" display="inline" color="primary">
                {result}
            </Typography>
        </Paper>
    );
}

const Input = () => {
    const { expression } = useAlgoContext();
    return (
        <Paper sx={{ padding: "0px 10px", borderRadius: 10, display: "flex", alignItems: "center", height: "100%" }} variant="outlined">
            <Typography variant="body2" display="inline">
                Input:&nbsp;
            </Typography>
            <Typography variant="body2" display="inline">
                {expression}
            </Typography>
        </Paper>
    );
}

const AlgoCode = () => {

    const { index, expression, state, prevSign } = useAlgoContext();

    const [highLightLine, setHighLightLine] = React.useState<number[]>([]);
    React.useEffect(() => {
        setHighLightLine(() => getHighLightLineNumber(index, expression, state, prevSign));
    }, [index, expression, state, prevSign]);

    const [expanded, setExpanded] = React.useState(false);
    const handleChange = () => { setExpanded(!expanded) };
    React.useEffect(() => {
        if (state === State.Typing) {
            setExpanded(false);
        } else {
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
                    <Typography variant='body1'>{info.name}</Typography>
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
