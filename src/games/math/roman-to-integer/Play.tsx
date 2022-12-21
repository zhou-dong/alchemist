import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Stack, Table, TableBody, TableCell, TableHead, TableRow, ToggleButton, ToggleButtonGroup } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import CodeBlock, { languages } from '../../dp/_components/CodeBlock';
import { useAlgoContext } from "./AlgoContext";
import { State } from "./AlgoState";
import { Item, Action } from "./algo";

const code = `if (previous < current) {
    sum -= previous;
} else {
    sum += previous;
}`

const CodeDisplay = () => {
    const { index, result } = useAlgoContext();
    const linesToHighlight = (result[index].action === Action.Subtract) ? [2] : [4];

    return (
        <CodeBlock
            code={code}
            language={languages.Typescript}
            showLineNumbers={true}
            linesToHighlight={linesToHighlight}
            wrapLines={true}
        />
    );
}

const InputDisplay = () => {

    const { index, result } = useAlgoContext();

    const last = result[result.length - 1];

    const normalStyle = {};
    const prevStyle = { color: "green", fontWeight: "bold" };
    const currentStyle = { color: "green", fontWeight: "bold" };

    const getStyle = (i: number) => {
        switch (i) {
            case index: return prevStyle;
            case index + 1: return currentStyle;
            default: return normalStyle;
        }
    }

    const getIndicator = (i: number) => {
        switch (i) {
            case index: return "previous";
            case index + 1: return "current";
            default: return "";
        }
    }

    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell padding="none" sx={{ border: "none" }}>
                        Roman
                    </TableCell>
                    {
                        result.map((item, i) => (
                            <TableCell key={i} padding="none" sx={getStyle(i)} >
                                {item.prev.symbol}
                            </TableCell>
                        ))
                    }
                    <TableCell padding="none" sx={(index === result.length - 1) ? currentStyle : {}} />
                </TableRow>
                <TableRow>
                    <TableCell padding="none" sx={{ border: "none" }}>
                        Value
                    </TableCell>
                    {
                        result.map((item, i) => (
                            <TableCell key={i} padding="none" sx={getStyle(i)} >
                                {item.prev.value || ""}
                            </TableCell>
                        ))
                    }
                    <TableCell padding="none" sx={(index === result.length - 1) ? currentStyle : {}} />
                </TableRow>
                <TableRow>
                    <TableCell padding="none" sx={{ border: "none" }}>
                        Sign
                    </TableCell>
                    {
                        result.map((item, i) => (
                            <TableCell key={i} padding="none" sx={getStyle(i)} >
                                {(item.action === Action.Add) ? "+" : "-"}
                            </TableCell>
                        ))
                    }
                    <TableCell padding="none" sx={(index === result.length - 1) ? currentStyle : {}} />
                </TableRow>
                <TableRow>
                    <TableCell padding="none" sx={{ border: "none" }}>
                        Sum
                    </TableCell>
                    {
                        result.map((item, i) => (
                            <TableCell key={i} padding="none" sx={getStyle(i)} >
                                {item.sum.previous}
                            </TableCell>
                        ))
                    }
                    <TableCell padding="none" sx={(index === result.length - 1) ? currentStyle : {}}>
                        {last && last.sum.current}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell padding="none" sx={{ border: "none" }} />
                    {
                        result.map((_, i) => (
                            <TableCell key={i} padding="none" sx={{ border: "none" }} >
                                {getIndicator(i)}
                            </TableCell>
                        ))
                    }
                    <TableCell padding="none" sx={{ border: "none" }}>
                        {(index === result.length - 1) && "current"}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

const Explain = () => {

    const { index, result } = useAlgoContext();
    const item = result[index];
    if (!item) {
        return <></>
    }

    const sign = (item.action === Action.Add) ? "+" : "-";

    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell rowSpan={3} padding="none" sx={{ maxWidth: "100px" }}>
                        <CodeDisplay />
                    </TableCell>

                    <TableCell padding="none">
                        previous
                    </TableCell>
                    <TableCell padding="none">
                        {item.prev.symbol}
                    </TableCell>
                    <TableCell padding="none">
                        {item.prev.value}
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell padding="none">
                        current
                    </TableCell>
                    <TableCell padding="none">
                        {item.current && item.current.symbol}
                    </TableCell>
                    <TableCell padding="none">
                        {item.current && item.current.value}
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell padding="none">
                        sum
                    </TableCell>
                    <TableCell padding="none" colSpan={2}>
                        {item.sum.current} = {item.sum.previous} {sign} {item.prev.value}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

const Steps = () => {

    const { index, result } = useAlgoContext();

    const Row: React.FC<{ item: Item, i: number }> = ({ item, i }) => {

        const normalStyle = {};
        const enabledStyle = { color: "green", fontWeight: "bold" };

        const style = (i === index) ? enabledStyle : normalStyle;
        const sign = (item.action === Action.Add) ? "+" : "-";
        const explainSign = (item.action === Action.Add) ? ">" : "<";

        return (
            <TableRow>
                <TableCell padding="none" sx={{ border: "none" }}>
                    {(i === index) ? <CircleIcon color="success" /> : <CircleOutlinedIcon />}
                </TableCell>

                <TableCell padding="none" sx={style}>
                    {item.prev.symbol}
                </TableCell>
                <TableCell padding="none" sx={style}>
                    {item.prev.value}
                </TableCell>

                <TableCell padding="none" sx={style}>
                    {item.current && item.current.symbol}
                </TableCell>
                <TableCell padding="none" sx={style}>
                    {item.current && item.current.value}
                </TableCell>

                <TableCell padding="none" sx={style}>
                    {item.current && item.prev.value} {item.current && explainSign} {item.current && item.current.value}
                </TableCell>
                <TableCell padding="none" sx={style}>
                    {sign}
                </TableCell>

                <TableCell padding="none" sx={style}>
                    {item.sum.previous} {sign} {item.prev.value}
                </TableCell>
                <TableCell padding="none" sx={style}>
                    {item.sum.current}
                </TableCell>
            </TableRow>
        )
    }

    return (
        <Table sx={{ width: "100%", minWidth: "700px" }}>
            <TableHead>
                <TableRow>
                    <TableCell padding="none" sx={{ border: "none" }} />
                    <TableCell colSpan={2} padding="none">previous</TableCell>
                    <TableCell colSpan={2} padding="none">current</TableCell>
                    <TableCell colSpan={2} padding="none">sign</TableCell>
                    <TableCell padding="none" colSpan={2}>sum</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    result.map((item, i) => <Row key={i} item={item} i={i} />)
                }
            </TableBody>
        </Table>
    )

}

const Main = () => {
    const { index, setIndex, result } = useAlgoContext();

    const [stepsExpanded, setStepsExpanded] = React.useState(false);

    const handleAccordionChange = () => {
        setStepsExpanded(expended => !expended);
    }

    return (
        <Stack spacing={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <InputDisplay />
            <Explain />

            <Accordion expanded={stepsExpanded} onChange={handleAccordionChange}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    Steps
                </AccordionSummary>
                <AccordionDetails>
                    <Steps />
                </AccordionDetails>
            </Accordion>


            <ToggleButtonGroup size="large">
                <ToggleButton
                    value="back"
                    disabled={index === result.length - 1}
                    onClick={() => {
                        setIndex(i => i + 1);
                    }}
                >
                    <ArrowCircleRightOutlinedIcon fontSize="large" />

                </ToggleButton>
                <ToggleButton
                    value="forward"
                    disabled={index === 0}
                    onClick={() => {
                        setIndex(i => i - 1);
                    }}>
                    <ArrowCircleLeftOutlinedIcon fontSize="large" />
                </ToggleButton>
            </ToggleButtonGroup>
        </Stack>
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
