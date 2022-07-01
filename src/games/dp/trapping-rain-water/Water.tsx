import { TableCell } from "@mui/material";
import { helperColorThree } from "./colors";
import NumsTableParams from "./numsTableParams";

const Water = ({ data, current, success }: NumsTableParams) => {
    if (current.row === 2) {
        if (success) {
            return (
                <>
                    {
                        data.map((item, i) => {
                            return <TableCell key={i} padding="none">{item}</TableCell>
                        })
                    }
                </>
            );
        } else {
            return (
                <>
                    {
                        data.map((item, i) => {
                            if (current.col === i) {
                                return <TableCell key={i} padding="none" style={{ color: helperColorThree, fontSize: 20 }}>?</TableCell>
                            }
                            if (current.col > i) {
                                return <TableCell key={i} padding="none">{item}</TableCell>
                            } else {
                                return <TableCell key={i} padding="none"></TableCell>
                            }
                        })
                    }
                </>
            );
        }
    } else {
        return (
            <>
                {data.map((_, i) => <TableCell key={i} padding="none"></TableCell>)}
            </>
        );
    }
};

export default Water;
