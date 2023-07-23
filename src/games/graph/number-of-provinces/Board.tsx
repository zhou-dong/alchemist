import { yellow } from '@mui/material/colors';
import { useAlgoContext } from "./AlgoContext";
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { State } from './AlgoState';

export const Board = () => {
    const { board, state, steps, index } = useAlgoContext();

    const step = steps[index];
    const cols = board[0]?.length || 0;

    const IndexStyle: React.CSSProperties = {
        border: "1px solid gray",
        padding: "6px",
        backgroundColor: yellow[500],
        textAlign: "center",
        width: 20
    };

    const DataStyle = (i: number, j: number): React.CSSProperties => {

        const base: React.CSSProperties = {
            border: "1px solid gray",
            padding: "6px",
            textAlign: "center",
            width: 20
        };

        if (!step) {
            return base;
        }
        const { row, col } = step;
        if (i === row && j === col) {
            return { ...base, backgroundColor: yellow[500] };
        } else {
            return base;
        }
    };

    const Display = () => (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell colSpan={cols + 1} sx={{ textAlign: "center" }} padding='none'>
                        Is Connected Map
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell padding='none' sx={IndexStyle} />
                    {
                        Array.from(Array(cols).keys()).map((c, j) =>
                            <TableCell key={j} padding='none' sx={IndexStyle}>
                                {c}
                            </TableCell>)
                    }
                </TableRow>
                {
                    board.map((row, i) =>
                        <TableRow key={i}>
                            <TableCell padding='none' sx={IndexStyle}>{i}</TableCell>
                            {
                                row.map((col, j) =>
                                    <TableCell key={j} padding='none' sx={DataStyle(i, j)}>
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
