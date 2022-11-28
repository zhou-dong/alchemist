import { Table, TableBody, TableCell, TableRow } from "@mui/material";

interface Props {
    map: Map<string, number>;
    currentKey: string;
    input: string;
}

const buildTableCellStyles = (key: string, currentKey: string) => {
    return (key === currentKey) ? { backgroundColor: "lightgreen", fontWeight: "bold" } : {};
}

const Main = ({ map, currentKey, input }: Props) => {

    const size = new Set(input.split("")).size;

    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell padding="none" style={{ color: "gray" }}>
                        Key
                    </TableCell>
                    {
                        Array.from(map.keys()).map((key, i) =>
                            < TableCell padding="none" key={i} style={buildTableCellStyles(key, currentKey)}>
                                {key}
                            </TableCell>
                        )
                    }
                    {
                        Array(size - map.size).fill(0).map((_, i) =>
                            <TableCell padding="none" key={i}></TableCell>
                        )
                    }
                </TableRow>
                <TableRow>
                    <TableCell padding="none" style={{ color: "gray" }}>
                        Value
                    </TableCell>
                    {
                        Array.from(map.entries()).map((entry, i) =>
                            < TableCell padding="none" key={i} style={buildTableCellStyles(entry[0], currentKey)}>
                                {entry[1]}
                            </TableCell>
                        )
                    }
                    {
                        Array(size - map.size).fill(0).map((_, i) =>
                            <TableCell padding="none" key={i}></TableCell>
                        )
                    }
                </TableRow>
            </TableBody>
        </Table >
    );
}

export default Main;
