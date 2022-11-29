import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";

const buildTableCellStyles = (key: string, currentKey: string) => {
    return (key === currentKey) ? { backgroundColor: "lightgreen" } : {};
}

const Main = () => {

    const { compared, index, input, mapIndex } = useAlgoContext();
    const currentKey = compared.chars[index];
    const map = (mapIndex === -1) ? new Map() : compared.maps[mapIndex];

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
