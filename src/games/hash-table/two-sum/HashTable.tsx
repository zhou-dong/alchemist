import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { Point } from "../../commons/point";

interface Props {
    comparedTable: (number | string)[][];
    currentPoint: Point;
}

const HashTable = ({ comparedTable, currentPoint }: Props) => {
    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell padding="none" style={{ backgroundColor: "lightgray" }}>
                        key
                    </TableCell>
                    {
                        comparedTable[0].map((col, i) => {
                            if (i + 1 < currentPoint.col) {
                                return < TableCell padding="none" key={i} >{col}</TableCell>
                            } else {
                                return < TableCell padding="none" key={i} ></TableCell>
                            }
                        })
                    }
                </TableRow>
                <TableRow>
                    <TableCell padding="none" style={{ backgroundColor: "lightgray" }}>
                        value
                    </TableCell>
                    {
                        comparedTable[1].map((col, i) => {
                            if (i + 1 < currentPoint.col) {
                                return < TableCell padding="none" key={i} >{col}</TableCell>
                            } else {
                                return < TableCell padding="none" key={i} ></TableCell>
                            }
                        })
                    }
                </TableRow>
            </TableBody>
        </Table >
    )
};

export default HashTable;
