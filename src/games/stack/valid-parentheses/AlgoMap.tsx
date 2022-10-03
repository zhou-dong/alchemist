import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

interface Props {
    parenthesisMap: Map<string, string>;
}

export default function AlgoMap({ parenthesisMap }: Props) {
    return (
        <>
            <Typography variant='body1' sx={{ marginBottom: 1 }}>Parentheses Maps</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ width: 50 }}>Key</TableCell>
                            <TableCell align="center" sx={{ borderLeft: "1px solid lightgrey", width: 50 }}>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            Array.from(parenthesisMap.entries()).map(([key, value]: [string, string]) => (
                                <TableRow key={key} hover>
                                    <TableCell align="center">{key}</TableCell>
                                    <TableCell align="center" sx={{ borderLeft: "1px solid lightgrey" }}>{value}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    );
}
