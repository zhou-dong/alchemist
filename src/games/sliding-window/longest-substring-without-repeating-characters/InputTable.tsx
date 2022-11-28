import { Table, TableBody, TableCell, TableRow } from "@mui/material";

export interface IndexProps {
    index: number;
    show: boolean;
}

export interface LeftProps {
    left: number;
    show: boolean;
}

export interface Range {
    left: number;
    right: number;
}

export interface RangeProps {
    range: Range;
    show: boolean;
}

interface Props {
    input: string;
    index: IndexProps;
    left: LeftProps;
    range: RangeProps;
}

const buildCharCellStyles = (index: IndexProps, current: number) => {
    if (index.index === current) {
        return { backgroundColor: "lightgreen", fontWeight: "bold" };
    } else {
        return {};
    }
}

const buildIndexCellStyles = (index: IndexProps, current: number) => {
    if (index.index === current) {
        return { backgroundColor: "gold" }
    } else {
        return {}
    }
}

const buildRangeStyles = (index: number, range: RangeProps) => {
    const { left, right } = range.range;
    if (index >= left && index <= right) {
        return { backgroundColor: "gold" };
    } else {
        return {};
    }
}

const buildLeftStyles = (index: number, left: LeftProps) => {
    if (index === left.left) {
        return { backgroundColor: "gold" };
    } else {
        return {};
    }
}

const Main = ({ input, index, range, left }: Props) => {
    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell padding="none" style={{ color: "gray" }}>
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
                    <TableCell padding="none" style={{ color: "gray" }}>
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
                    <TableCell padding="none" style={{ color: "gray" }}>
                        Left
                    </TableCell>
                    {
                        input.split("").map((_, i) =>
                            <TableCell padding="none" key={i} style={{ ...buildLeftStyles(i, left) }}>
                                {i === left.left && left.left}
                            </TableCell>
                        )
                    }
                </TableRow>
                <TableRow>
                    <TableCell padding="none" style={{ color: "gray" }}>
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
