import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack, Typography } from '@mui/material';
import TableViewOutlinedIcon from '@mui/icons-material/TableViewOutlined';
import { styled } from '@mui/material/styles';

const AlgoMapContainer = styled("div")(() => ({
    position: "fixed",
    textAlign: "center",
    right: 200,
    top: 112
}));

interface Props {
    activedKey: string | null;
    parenthesisMap: Map<string, string>;
}

const activedFontStyle = { color: "blue", fontWeight: "bold", fontSize: 30 };
const inactivedFontStyle = {}

const getFontStyle = (key: string, activeKey: string | null) => {
    return (activeKey && activeKey === key) ? activedFontStyle : inactivedFontStyle;
}

export default function AlgoMap({ activedKey, parenthesisMap }: Props) {
    return (
        <AlgoMapContainer>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", marginBottom: 1 }}>
                <TableViewOutlinedIcon sx={{ color: "rgba(0, 0, 0, 0.54)" }} fontSize="medium" />
                <Typography variant='body1'>Parentheses Map</Typography>
            </Stack>
            <TableContainer component={Paper} variant="outlined">
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
                                    <TableCell align="center" sx={{ ...getFontStyle(key, activedKey) }}>{key}</TableCell>
                                    <TableCell align="center" sx={{ ...getFontStyle(key, activedKey), borderLeft: "1px solid lightgrey" }}>{value}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </AlgoMapContainer>
    );
}
