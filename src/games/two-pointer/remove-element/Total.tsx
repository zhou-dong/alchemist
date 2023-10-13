import { TableCell } from "@mui/material";
import NumsTableParams from "./numsTableParams";

const Total = ({ current, guiders }: NumsTableParams) => {
    const { coordinates, waters } = guiders;
    const { left, right } = coordinates[current.col];
    if (left > right) {
        return (
            <TableCell padding="none" style={{ backgroundColor: "green", color: "white", fontSize: 20 }}>
                {
                    waters[current.col]
                }
            </TableCell>
        );
    } else {
        return (
            <TableCell padding="none">
                {
                    waters[current.col]
                }
            </TableCell>
        );
    }
};

export default Total;
