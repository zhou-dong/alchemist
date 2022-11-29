import { Table, TableBody, TableCell, TableRow } from "@mui/material";

interface Range {
    left: number;
    right: number;
}

interface Props {
    left: number;
    input: string;
    index: number;
    range?: Range;
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
        return { backgroundColor: "gold" }
    } else {
        return {}
    }
}

const buildRangeStyles = (index: number, range: Range | undefined) => {
    if (!range) {
        return {};
    }
    const { left, right } = range;
    if (index >= left && index <= right) {
        return { backgroundColor: "gold" };
    } else {
        return {};
    }
}

const buildLeftStyles = (index: number, left: number) => {
    if (index === left) {
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
                                {i === left && left}
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
