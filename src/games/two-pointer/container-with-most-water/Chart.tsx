import { Table, TableBody, TableCell, TableRow } from "@mui/material";

interface Props {
    heights: number[];
    left: number;
    right: number;
}

const emptyStyle = { border: "none", borderRight: "none", borderBottom: "none" };
const normalStyle = { border: "none", borderBottom: "none", borderRight: "8px solid lightblue" };
const enabledStyle = { border: "none", borderBottom: "none", borderRight: "8px solid gold" };
const bottomStyle = { borderBottom: "2px solid gray" };
const areaStyle = { backgroundColor: "lightgreen" };

const Main = ({ heights, left, right }: Props) => {

    const maxHeight = heights.reduce((a, b) => a > b ? a : b);

    // init table
    const table: any[][] = [];
    for (let i = 0; i < maxHeight; i++) {
        const row: any[] = [];
        for (let j = 0; j < heights.length; j++) {
            row.push(emptyStyle);
        }
        table.push(row);
    }

    // draw verticle lines
    for (let row = 0; row < table.length; row++) {
        for (let col = 0; col < table[row].length; col++) {
            const height = heights[col];
            if (row >= (maxHeight - height)) {
                if (col === left || col === right) {
                    table[row][col] = enabledStyle;
                } else {
                    table[row][col] = normalStyle;
                }
            }
        }
    }

    // draw bottom
    const lastRow = table[table.length - 1];
    for (let col = 1; col < lastRow.length; col++) {
        const styles = lastRow[col];
        lastRow[col] = { ...styles, ...bottomStyle }
    }

    // draw area
    for (let row = 0; row < table.length; row++) {
        for (let col = 0; col < table[row].length; col++) {
            const height = Math.min(heights[left], heights[right]);
            if (row >= (maxHeight - height)) {
                if (col > left && col <= right) {
                    const styles = table[row][col];
                    table[row][col] = { ...styles, ...areaStyle }
                }
            }
        }
    }

    return (
        <Table>
            <TableBody>
                {
                    table.map((row, i) => (
                        <TableRow key={i}>
                            {
                                row.map((cell, j) =>
                                    <TableCell key={j} style={cell} />
                                )
                            }
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
}

export default Main;
