import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';
import * as React from 'react';
import CodeIcon from '@mui/icons-material/Code';
import CodeBlock, { languages } from '../../dp/_components/CodeBlock';
import { formula } from "./contents";

interface Props {
    activedKey: string | null;
    parenthesisMap: Map<string, string>;
}

const getHighLightLineNumber = (activedKey: string | null, parenthesisMap: Map<string, string>): number => {
    return (activedKey && parenthesisMap.has(activedKey)) ? 14 : 12;
}

const AlgoCode = ({ activedKey, parenthesisMap }: Props) => {

    const highLightLine = getHighLightLineNumber(activedKey, parenthesisMap);
    const [expanded, setExpanded] = React.useState(true);
    const handleChange = () => { setExpanded(!expanded) };

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
                    linesToHighlight={[highLightLine]}
                    wrapLines={true}
                />
            </AccordionDetails>

        </Accordion>
    )
}

export default AlgoCode;
