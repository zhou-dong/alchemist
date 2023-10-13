import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import NumsTableParams from "./numsTableParams";

const Heights = ({ data, current, guiders }: NumsTableParams) => (
    <div>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell padding="none" style={{ border: 0, borderWidth: 0 }}>Height </TableCell>
                    {
                        data.map((item, i) => {
                            const { coordinates } = guiders;
                            const { left, right } = coordinates[current.col];
                            if (left > right) {
                                return (<TableCell key={i} padding="none">{item}</TableCell>)
                            } else {
                                const { left, right } = guiders.coordinates[current.col];
                                if (i === left || i === right) {
                                    return (<TableCell key={i} padding="none" style={{ backgroundColor: "green", color: "white" }}>{item}</TableCell>)
                                } else {
                                    return (<TableCell key={i} padding="none">{item}</TableCell>)
                                }
                            }
                        })
                    }
                </TableRow>
                <TableRow>
                    <TableCell padding="none" style={{ border: 0, borderWidth: 0 }}>Max</TableCell>
                    {
                        data.map((_, i) => {
                            const { coordinates } = guiders;
                            const { left, right } = coordinates[current.col];
                            if (left > right) {
                                return <TableCell key={i} padding="none" style={{ border: 0, borderWidth: 0 }}></TableCell>
                            } else {
                                const { left, right, maxLeft, maxRight } = guiders.coordinates[current.col];
                                if (i === left - 1) {
                                    return <TableCell key={i} padding="none" style={{ border: 0, borderWidth: 0 }}>{maxLeft}</TableCell>
                                } else if (i === right + 1) {
                                    return <TableCell key={i} padding="none" style={{ border: 0, borderWidth: 0 }}>{maxRight}</TableCell>
                                } else {
                                    return <TableCell key={i} padding="none" style={{ border: 0, borderWidth: 0 }}></TableCell>
                                }
                            }
                        })
                    }
                </TableRow>
            </TableBody>
        </Table>
    </div>
);

export default Heights;
