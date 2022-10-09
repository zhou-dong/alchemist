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

interface Props {
    activedKey: string | null;
    parenthesisMap: Map<string, string>;
}

const getHeadCellStyle = (activedKey: string | null, parenthesisMap: Map<string, string>) => {
    const containsKeyStyle = {};
    const notContainersKeyStyle = { color: "red", fontWeight: "bolder" };
    return (activedKey && parenthesisMap.has(activedKey)) ? containsKeyStyle : notContainersKeyStyle;
}

const getBodyCellStyle = (key: string, activeKey: string | null) => {
    const activedKeyStyle = { color: "blue", fontWeight: "bolder" };
    const inactivedKeyStyle = {};
    return (activeKey && activeKey === key) ? activedKeyStyle : inactivedKeyStyle;
};

const getIconStyle = (activedKey: string | null, parenthesisMap: Map<string, string>) => {
    const containsKeyIconStyle = { color: "blue" };
    const notContainersKeyIconStyle = { color: "red" };
    return (activedKey && parenthesisMap.has(activedKey)) ? containsKeyIconStyle : notContainersKeyIconStyle;
};

export default function AlgoMap({ activedKey, parenthesisMap }: Props) {

    const [expanded, setExpanded] = React.useState(true);
    const handleChange = () => { setExpanded(!expanded) };

    return (
        <Accordion expanded={expanded} onChange={handleChange}>

            <AccordionSummary>
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                    <TableViewOutlinedIcon sx={{ ...getIconStyle(activedKey, parenthesisMap) }} fontSize="medium" />
                    <Typography variant='body1'>Map</Typography>
                </Stack>
            </AccordionSummary>

            <AccordionDetails>
                <TableContainer component={Paper} variant="outlined">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ ...getHeadCellStyle(activedKey, parenthesisMap), width: 50 }}>Key</TableCell>
                                <TableCell align="center" sx={{ ...getHeadCellStyle(activedKey, parenthesisMap), borderLeft: "1px solid lightgrey", width: 50 }}>Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                Array.from(parenthesisMap.entries()).map(([key, value]: [string, string]) => (
                                    <TableRow key={key} hover>
                                        <TableCell align="center" sx={{ ...getBodyCellStyle(key, activedKey) }}>{key}</TableCell>
                                        <TableCell align="center" sx={{ ...getBodyCellStyle(key, activedKey), borderLeft: "1px solid lightgrey" }}>{value}</TableCell>
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
