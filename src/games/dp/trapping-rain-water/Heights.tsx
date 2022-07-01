import { TableCell } from "@mui/material";
import { helperColorTwo } from "./colors";
import NumsTableParams from "./numsTableParams";

const Heights = ({ data, current, success }: NumsTableParams) => {
    const { row, col } = current;
    if (row === 0) {
        return (
            <>
                {
                    data.map((item, i) => {
                        if (i + 1 === col) {
                            return <TableCell key={i} padding="none" style={{ backgroundColor: helperColorTwo }}>{item}</TableCell>
                        } else {
                            return <TableCell key={i} padding="none">{item}</TableCell>
                        }
                    })
                }
            </>
        );
    } else if (row === 1) {
        return (
            <>
                {
                    data.map((item, i) => {
                        if (i - 1 === col) {
                            return <TableCell key={i} padding="none" style={{ backgroundColor: helperColorTwo }}>{item}</TableCell>
                        } else {
                            return <TableCell key={i} padding="none">{item}</TableCell>
                        }
                    })
                }
            </>
        );
    } else {
        if (success) {
            return (
                <>
                    {data.map((item, i) => <TableCell key={i} padding="none">{item}</TableCell>)}
                </>
            );
        } else {
            return (
                <>
                    {
                        data.map((item, i) => {
                            if (i === col) {
                                return <TableCell key={i} padding="none" style={{ backgroundColor: helperColorTwo }}>{item}</TableCell>
                            } else {
                                return <TableCell key={i} padding="none">{item}</TableCell>
                            }
                        })
                    }
                </>
            );
        }
    }
};

export default Heights;
