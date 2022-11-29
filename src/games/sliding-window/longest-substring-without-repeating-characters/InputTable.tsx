import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import { Range } from "./compared";

const charStyles = (index: number, i: number) => {
    if (index === i) {
        return { backgroundColor: "lightgreen" };
    } else {
        return {};
    }
}

const indexStyles = (index: number, i: number) => {
    if (index !== i) {
        return {};
    } else {
        return { backgroundColor: "gold" }
    }
}

const rangeStyles = ({ left, right }: Range, i: number) => {
    if (i < left || i > right) {
        return {};
    } else {
        return { backgroundColor: "gold" }
    }
}

const Main = () => {
    const { index, compared } = useAlgoContext();
    const { chars, indices, lefts, maxs, ranges } = compared;

    const CharCells = () => (
        <>
            {
                chars.map((ch, i) =>
                    <TableCell padding="none" key={i} style={charStyles(index, i)}>
                        {ch}
                    </TableCell>
                )
            }
        </>
    );

    const IndexCells = () => (
        <>
            {
                indices.map((item, i) =>
                    <TableCell padding="none" key={i} style={indexStyles(item, index)}>
                        {item}
                    </TableCell>
                )
            }
        </>
    );

    const LeftCells = () => (
        <>
            {
                lefts.map((left, i) =>
                    <TableCell padding="none" key={i}>
                        {left.show && left.value}
                    </TableCell>
                )
            }
        </>
    );

    const MaxCells = () => (
        <>
            {
                maxs.map((max, i) =>
                    <TableCell padding="none" key={i}>
                        {max.show && max.value}
                    </TableCell>
                )
            }
        </>
    );

    const RangeCells = () => {
        const range = (index >= ranges.length) ? ranges[ranges.length - 1] : ranges[index];
        return (
            <>
                {
                    Array.from(Array(chars.length).keys()).map(num =>
                        <TableCell padding="none" key={num} sx={rangeStyles(range, num)} />
                    )
                }
            </>
        );
    };

    const titleStyles = { color: "gray" };

    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell padding="none" style={titleStyles}>
                        Char
                    </TableCell>
                    <CharCells />
                </TableRow>
                <TableRow>
                    <TableCell padding="none" style={titleStyles}>
                        Index
                    </TableCell>
                    <IndexCells />
                </TableRow>
                <TableRow>
                    <TableCell padding="none" style={titleStyles}>
                        Left
                    </TableCell>
                    <LeftCells />
                </TableRow>
                <TableRow>
                    <TableCell padding="none" style={titleStyles}>
                        Max
                    </TableCell>
                    <MaxCells />
                </TableRow>
                <TableRow>
                    <TableCell padding="none" style={titleStyles}>
                        Range
                    </TableCell>
                    <RangeCells />
                </TableRow>
            </TableBody>
        </Table >
    );
}

export default Main;
