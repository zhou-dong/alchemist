import { TableCell } from "@mui/material";
import { helperColorOne, helperColorThree } from "./colors";
import NumsTableParams from "./numsTableParams";

const RightMax = ({ data, current, success }: NumsTableParams) => {
    const { row, col } = current;
    if (row === 0) {
        return (
            <>
                {data.map((_, i) => <TableCell key={i} padding="none"></TableCell>)}
            </>
        );
    } else if (row === 1) {
        return (
            <>
                {
                    data.map((item, i) => {
                        if (col === i) {
                            return <TableCell key={i} padding="none" style={{ color: helperColorThree, fontSize: 20 }}>?</TableCell>
                        } else if (i < col) {
                            return <TableCell key={i} padding="none"></TableCell>
                        } else {
                            if (i - 1 === col) {
                                return <TableCell key={i} padding="none" style={{ backgroundColor: helperColorOne }}>{item}</TableCell>
                            } else {
                                return <TableCell key={i} padding="none">{item}</TableCell>
                            }

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
                            if (col === i) {
                                return <TableCell key={i} padding="none" style={{ backgroundColor: helperColorOne }}>{item}</TableCell>
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

export default RightMax;
