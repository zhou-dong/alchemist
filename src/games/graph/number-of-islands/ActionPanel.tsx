import React from "react";
import { IconButton, Table, TableBody, TableCell, TableRow, styled } from "@mui/material"
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import { Step } from "./algo";

const Position = styled("div")({
    position: "fixed",
    bottom: "15%",
    left: "50%",
    transform: "translate(-50%)",
});

interface Props {
    steps: Step[];
    index: number;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
    setStepsCount: React.Dispatch<React.SetStateAction<number>>;
    setErrorsCount: React.Dispatch<React.SetStateAction<number>>;
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>
}

const Main = ({ steps, index, setStepsCount, setErrorsCount, setSuccess, setIndex }: Props) => {
    const step = steps[index];

    const disabled: boolean = step === undefined;

    const handleLeftClick = () => {
        setStepsCount(count => count + 1);
        console.log("left");
    }

    const handleRightClick = () => {
        setStepsCount(count => count + 1);
        console.log("right");
    }

    const handleUpClick = () => {
        setStepsCount(count => count + 1);
        console.log("up");
    }

    const handleDownClick = () => {
        setStepsCount(count => count + 1);
        console.log("down");
    }

    return (
        <Position>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell padding="none" sx={{ border: "none" }}></TableCell>
                        <TableCell padding="none" sx={{ border: "none" }}>
                            <IconButton onClick={handleUpClick} color="info" disabled={disabled}>
                                <ArrowCircleUpOutlinedIcon fontSize="large" />
                            </IconButton>
                        </TableCell>
                        <TableCell padding="none" sx={{ border: "none" }}></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell padding="none" sx={{ border: "none" }}>
                            <IconButton onClick={handleLeftClick} color="info" disabled={disabled}>
                                <ArrowCircleLeftOutlinedIcon fontSize="large" />
                            </IconButton>
                        </TableCell>
                        <TableCell padding="none" sx={{ border: "none" }}>
                            <IconButton onClick={handleDownClick} color="info" disabled={disabled}>
                                <ArrowCircleDownOutlinedIcon fontSize="large" />
                            </IconButton>
                        </TableCell>
                        <TableCell padding="none" sx={{ border: "none" }}>
                            <IconButton onClick={handleRightClick} color="info" disabled={disabled} >
                                <ArrowCircleRightOutlinedIcon fontSize="large" />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Position>
    );
}

export default Main;
