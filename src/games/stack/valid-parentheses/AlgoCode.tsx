import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';
import * as React from 'react';
import CodeIcon from '@mui/icons-material/Code';
import CodeBlock, { languages } from '../../dp/_components/CodeBlock';
import { formula } from "./contents";
import { useAlgoContext } from "./AlgoContext";
import { State } from "./AlgoState";

const getHighLightLineNumber = (activedKey: string | null, parenthesisMap: Map<string, string>, state: State): number[] => {
    if (state === State.Typing || state === State.Finished) {
        return [];
    }

    if (!activedKey) {
        return [19];
    }

    return parenthesisMap.has(activedKey) ? [14] : [12];
}

const AlgoCode = () => {

    const { activedKey, parenthesisMap, state } = useAlgoContext();

    const [highLightLine, setHighLightLine] = React.useState<number[]>([]);
    React.useEffect(() => {
        setHighLightLine(() => getHighLightLineNumber(activedKey, parenthesisMap, state));
    }, [activedKey, parenthesisMap, state]);

    const [expanded, setExpanded] = React.useState(true);
    const handleChange = () => { setExpanded(!expanded) };
    React.useEffect(() => {
        if (state === State.Typing || state === State.Finished) {
            setExpanded(false);
        }
        if (state === State.Playing) {
            setExpanded(true);
        }
    }, [state]);

    return (
        <Accordion expanded={expanded} onChange={handleChange}>

            <AccordionSummary>
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                    <CodeIcon fontSize="medium" />
                    <Typography variant='body1'>Code</Typography>
                </Stack>
            </AccordionSummary>

            <AccordionDetails sx={{ marginTop: -1 }}>
                <CodeBlock
                    code={formula}
                    language={languages.Typescript}
                    showLineNumbers={true}
                    linesToHighlight={highLightLine}
                    wrapLines={true}
                />
            </AccordionDetails>

        </Accordion>
    )
}

export default AlgoCode;
