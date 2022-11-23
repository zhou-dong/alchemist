import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';
import * as React from 'react';
import CodeIcon from '@mui/icons-material/Code';
import { styled } from '@mui/material/styles';
import CodeBlock, { languages } from '../../dp/_components/CodeBlock';
import { shortFormula } from "./contents";
import { useAlgoContext } from "./AlgoContext";
import { State } from "./AlgoState";
import AlgoExpression from "./AlgoExpression";

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

const AlgoCode = () => {

    const { index, expression, state, result } = useAlgoContext();

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

    const AlgoResult = () => (
        <>
            <Typography variant='body1'>Result:</Typography>
            <CodeBlock code={result.toString()} language={languages.Javascript} />
        </>
    )

    return (
        <Accordion expanded={expanded} onChange={handleChange}>

            <AccordionSummary>
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                    <CodeIcon fontSize="medium" />
                    <Typography variant='body1'>Code</Typography>
                    <Typography variant='body1'>Input:</Typography>
                    <CodeBlock code={expression} language={languages.Javascript} />
                    {state === State.Finished && <AlgoResult />}
                </Stack>
            </AccordionSummary>

            <AccordionDetails sx={{ padding: 0, marginTop: -2 }}>
                <AlgoExpression />
                <CodeBlock
                    code={shortFormula}
                    language={languages.Typescript}
                    showLineNumbers={true}
                    linesToHighlight={highLightLine}
                    wrapLines={true}
                />
            </AccordionDetails>

        </Accordion>
    )
}

const Position = styled("div")(() => ({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    position: "fixed",
    top: 180
}));

const Main = () => (
    <Position>
        <AlgoCode />
    </Position>
);

export default Main;
