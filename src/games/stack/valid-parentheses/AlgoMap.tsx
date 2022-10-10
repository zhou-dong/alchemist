import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';
import TableViewOutlinedIcon from '@mui/icons-material/TableViewOutlined';
import { useAlgoContext } from "./AlgoContext";
import { State } from "./AlgoState";

const getHeadCellStyle = (activedKey: string | null, parenthesisMap: Map<string, string>, state: State) => {
    const regularStyle = { width: 50 };

    if (state === State.Typing || state === State.Finished) {
        return regularStyle;
    }

    if (activedKey === null) {
        return regularStyle;
    }

    const notContainersKeyStyle = { backgroundColor: "purple", color: "white", fontWeight: "bold", width: 50 };
    return parenthesisMap.has(activedKey) ? regularStyle : notContainersKeyStyle;
}

const getBodyCellStyle = (key: string, activedKey: string | null, state: State) => {
    const regularStyle = {};

    if (state === State.Typing || state === State.Finished) {
        return regularStyle;
    }

    if (activedKey === null) {
        return regularStyle;
    }

    const activedStyle = { backgroundColor: "blue", color: "white", fontWeight: "bold" };
    return activedKey === key ? activedStyle : regularStyle;
};

export default function AlgoMap() {

    const { activedKey, parenthesisMap, state } = useAlgoContext();

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
                    <TableViewOutlinedIcon fontSize="medium" />
                    <Typography variant='body1'>Map</Typography>
                </Stack>
            </AccordionSummary>

            <AccordionDetails>
                <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ ...getHeadCellStyle(activedKey, parenthesisMap, state) }}>Key</TableCell>
                                <TableCell align="center" sx={{ ...getHeadCellStyle(activedKey, parenthesisMap, state), borderLeft: "1px solid lightgrey" }}>Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                Array.from(parenthesisMap.entries()).map(([key, value]: [string, string]) => (
                                    <TableRow key={key} hover>
                                        <TableCell align="center" sx={{ ...getBodyCellStyle(key, activedKey, state) }}>{key}</TableCell>
                                        <TableCell align="center" sx={{ ...getBodyCellStyle(key, activedKey, state), borderLeft: "1px solid lightgrey" }}>{value}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </AccordionDetails>

        </Accordion>
    );
}
