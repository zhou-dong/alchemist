import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import Range from "./range";

interface Props {
    left: number;
    input: string;
    index: number;
    range: Range;
}

const buildCharCellStyles = (index: number, current: number) => {
    if (index === current) {
        return { backgroundColor: "lightgreen", fontWeight: "bold" };
    } else {
        return {};
    }
}

const buildIndexCellStyles = (index: number, current: number) => {
    if (index === current) {
        return { backgroundColor: "gold", border: "none" }
    } else {
        return { border: "none" }
    }
}

const buildRangeStyles = (index: number, { left, right }: Range) => {
    if (index >= left && index <= right) {
        return { border: "none", backgroundColor: "gold" };
    } else {
        return { border: "none" };
    }
}

const buildLeftStyles = (index: number, left: number) => {
    if (index === left) {
        return { border: "none", backgroundColor: "gold" };
    } else {
        return { border: "none" };
    }
}

const Main = ({ input, index, range, left }: Props) => {
    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell padding="none" style={{ border: "none" }}>
                        Char
                    </TableCell>
                    {
                        input.split("").map((character, i) =>
                            <TableCell padding="none" key={i} style={buildCharCellStyles(index, i)}>
                                {character}
                            </TableCell>
                        )
                    }
                </TableRow>
                <TableRow>
                    <TableCell padding="none" style={{ border: "none" }} align="right">
                        Index
                    </TableCell>
                    {
                        input.split("").map((_, i) =>
                            <TableCell padding="none" key={i} style={{ ...buildIndexCellStyles(index, i) }}>
                                {i}
                            </TableCell>
                        )
                    }
                </TableRow>
                <TableRow>
                    <TableCell padding="none" style={{ border: "none" }} >
                        Left
                    </TableCell>
                    {
                        input.split("").map((_, i) =>
                            <TableCell padding="none" key={i} style={{ ...buildLeftStyles(i, left) }}>
                                {i === left && left}
                            </TableCell>
                        )
                    }
                </TableRow>
                <TableRow>
                    <TableCell padding="none" style={{ border: "none" }}>
                        Max
                    </TableCell>
                    {
                        input.split("").map((_, i) =>
                            <TableCell padding="none" key={i} style={buildRangeStyles(i, range)} />
                        )
                    }
                </TableRow>
            </TableBody>
        </Table >
    );
}

export default Main;
