import { TableCell } from "@mui/material";
import NumsTableParams from "./numsTableParams";

const Total = ({ data, current, success }: NumsTableParams) => {
    if (current.row < 2) {
        return (<TableCell padding="none">0</TableCell>);
    } else {
        if (success) {
            return (
                <TableCell padding="none" style={{ backgroundColor: "green", color: "white", fontSize: 20 }}>
                    {
                        data.reduce((one, two) => one + two)
                    }
                </TableCell>
            );
        } else {
            return (
                <TableCell padding="none">
                    {
                        data
                            .map((item, i) => {
                                if (i >= current.col) {
                                    return 0;
                                } else {
                                    return item;
                                }
                            })
                            .reduce((one, two) => one + two)
                    }
                </TableCell>
            );
        }
    }
};

export default Total;
