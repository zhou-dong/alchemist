import { Table, TableBody, TableCell, TableRow, styled } from "@mui/material";
import { landStyle, waterStyle, visitedStyle } from "./Grid";

const Position = styled("div")({
    display: "inline-block"
});

const cellStyle = { border: "2px solid #fff" };
const leftStyle = { ...cellStyle, width: "150px", borderRight: "none", textAlign: "center" };
const rightStyle = { ...cellStyle, width: "10px", borderLeft: "none", textAlign: "left" };

const Main = () => (
    <Position>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell sx={{ ...waterStyle, ...leftStyle }} padding="none">water</TableCell>
                    <TableCell sx={{ ...waterStyle, ...rightStyle }} padding="none">0</TableCell>

                    <TableCell sx={{ ...landStyle, ...leftStyle }} padding="none">land</TableCell>
                    <TableCell sx={{ ...landStyle, ...rightStyle }} padding="none">1</TableCell>

                    <TableCell sx={{ ...visitedStyle, ...leftStyle }} padding="none">visited</TableCell>
                    <TableCell sx={{ ...visitedStyle, ...rightStyle }} padding="none">2</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </Position>
);

export default Main;
