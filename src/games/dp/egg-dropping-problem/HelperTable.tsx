import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Point } from "../_commons/point";

interface Props {
    helperTable: (string | number)[][];
    resultsInDifferentFloors: number[];
    currentPoint: Point;
    comparedTable: (string | number)[][];
}

const createResultEquation = (table: number[]): string => {
    const explain: string[] = table.map((_, i) => "floor_" + (i + 1));
    return `Math.min(${explain.join(", ")}) = Math.min(${table.join(", ")})`;
};

const HelperTable = (props: Props) => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell padding="none" rowSpan={2}>FLOOR</TableCell>
                <TableCell padding="none" colSpan={3}>BREAKS</TableCell>
                <TableCell padding="none" colSpan={3}>NON BREAKS</TableCell>
                <TableCell padding="none">RESULT</TableCell>
            </TableRow>

            <TableRow>

                <TableCell padding="none">LEFT EGGS</TableCell>
                <TableCell padding="none">LEFT FLOORS</TableCell>
                <TableCell padding="none">RESULT</TableCell>

                <TableCell padding="none">LEFT EGGS</TableCell>
                <TableCell padding="none">LEFT FLOORS</TableCell>
                <TableCell padding="none">RESULT</TableCell>

                <TableCell padding="none">1+ Max(Breaks, NonBreaks)</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {
                props.helperTable.map((row, rowIndex) => {
                    return <TableRow key={rowIndex}>
                        {
                            row.map((cell, colIndex) => {
                                return <TableCell key={colIndex} padding="none"> {cell} </TableCell>
                            })
                        }
                    </TableRow>
                })
            }
            <TableRow>
                <TableCell padding="none" style={{ fontWeight: "bold" }}>RESULT</TableCell>
                <TableCell padding="none" colSpan={6} style={{ fontWeight: "bold" }}>
                    {createResultEquation(props.resultsInDifferentFloors)}
                </TableCell>
                <TableCell padding="none" colSpan={2} style={{ fontWeight: "bold" }}>
                    {props.comparedTable[props.currentPoint.row][props.currentPoint.col]}
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
);

const Helper = (props: Props) => (
    <>
        <div style={{ marginTop: "20px", marginBottom: "5px", fontSize: "16px" }} >
            <span style={{ fontWeight: "bolder" }}>Helpers: </span>{`{ eggs: ${props.currentPoint.row}, floors: ${props.currentPoint.col - 1} }`}
        </div>
        <HelperTable {...props} />
    </>
);

export default Helper;
