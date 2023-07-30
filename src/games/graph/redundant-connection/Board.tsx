import { yellow } from '@mui/material/colors';
import { useAlgoContext } from "./AlgoContext";
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { State } from './AlgoState';

export const Board = () => {
    const { state, index, edges } = useAlgoContext();

    const baseDataStyle: React.CSSProperties = {
        border: "1px solid gray",
        padding: "6px",
        textAlign: "center",
        width: 30
    };

    const DataStyle = (i: number): React.CSSProperties => {
        if (i === index) {
            return { ...baseDataStyle, backgroundColor: yellow[500] };
        } else {
            return baseDataStyle;
        }
    };

    const Display = () => (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell colSpan={2} sx={{ textAlign: "center" }} padding='none'>
                        Edges
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    edges.map((row, i) =>
                        <TableRow key={i}>
                            {
                                row.map((col, j) =>
                                    <TableCell key={j} padding='none' sx={DataStyle(i)}>
                                        {col}
                                    </TableCell>)
                            }
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    );

    return (
        <>
            {state !== State.Typing && <Display />}
        </>
    );
}
