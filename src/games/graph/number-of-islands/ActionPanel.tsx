import React from "react";
import { Button, ButtonGroup, IconButton, Table, TableBody, TableCell, TableRow, styled } from "@mui/material"
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import SouthOutlinedIcon from '@mui/icons-material/SouthOutlined';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import { Direction, Step } from "./algo";

const Position = styled("div")({
    position: "fixed",
    bottom: "15%",
    left: "50%",
    transform: "translate(-50%)",
});

interface Props {
    steps: Step[];
    index: number;
    success: boolean;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
    setStepsCount: React.Dispatch<React.SetStateAction<number>>;
    setErrorsCount: React.Dispatch<React.SetStateAction<number>>;
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>
}

const Main = ({ steps, index, success, setStepsCount, setErrorsCount, setSuccess, setIndex }: Props) => {
    const step = steps[index];
    const disabled: boolean = success;

    const increaseIndex = React.useCallback((dir: Direction) => {
        if (!step) {
            return;
        }

        const { direction } = step;
        if (direction === undefined || direction === dir) {
            if (index === steps.length - 1) {
                setSuccess(true);
            } else {
                setIndex(i => i + 1);
            }
        } else {
            setErrorsCount(count => count + 1);
        }
        setStepsCount(count => count + 1);
    }, [steps, index, setStepsCount, setErrorsCount, setSuccess, setIndex, step]);

    const action = React.useCallback((event: KeyboardEvent) => {
        switch (event.key) {
            case "ArrowUp": return increaseIndex(Direction.Up);
            case "ArrowRight": return increaseIndex(Direction.Right);
            case "ArrowDown": return increaseIndex(Direction.Down);
            case "ArrowLeft": return increaseIndex(Direction.Left);
        }
    }, [increaseIndex]);

    React.useEffect(() => {
        document.addEventListener('keydown', action);
        return () => document.removeEventListener("keydown", action);
    }, [action]);

    const handleLeftClick = () => increaseIndex(Direction.Left);
    const handleRightClick = () => increaseIndex(Direction.Right);
    const handleUpClick = () => increaseIndex(Direction.Up);
    const handleDownClick = () => increaseIndex(Direction.Down);
    const handleStartDFS = () => increaseIndex(Direction.StartDFS);
    const handleSkipDFS = () => increaseIndex(Direction.SkipDFS);
    const hanldeRollback = () => increaseIndex(Direction.Rollback);

    const color = "success"

    return (
        <Position>

            <ButtonGroup disabled={disabled} color={color} variant="contained">
                <Button endIcon={<SouthOutlinedIcon />} sx={{ textTransform: "none" }} onClick={handleStartDFS}>
                    DFS
                </Button>
                <Button endIcon={<RedoOutlinedIcon />} sx={{ textTransform: "none" }} onClick={handleSkipDFS}>
                    Next
                </Button>
            </ButtonGroup>

            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell padding="none" sx={{ border: "none" }} />
                        <TableCell padding="none" sx={{ border: "none" }}>
                            <IconButton onClick={handleUpClick} color={color} disabled={disabled}>
                                <ArrowCircleUpOutlinedIcon fontSize="large" />
                            </IconButton>
                        </TableCell>
                        <TableCell padding="none" sx={{ border: "none" }} />
                    </TableRow>

                    <TableRow>
                        <TableCell padding="none" sx={{ border: "none" }}>
                            <IconButton onClick={handleLeftClick} color={color} disabled={disabled}>
                                <ArrowCircleLeftOutlinedIcon fontSize="large" />
                            </IconButton>
                        </TableCell>
                        <TableCell padding="none" sx={{ border: "none" }}>
                            <IconButton onClick={hanldeRollback} color={color} disabled={disabled}>
                                <UndoOutlinedIcon fontSize="large" />
                            </IconButton>
                        </TableCell>
                        <TableCell padding="none" sx={{ border: "none" }}>
                            <IconButton onClick={handleRightClick} color={color} disabled={disabled} >
                                <ArrowCircleRightOutlinedIcon fontSize="large" />
                            </IconButton>
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell padding="none" sx={{ border: "none" }} />
                        <TableCell padding="none" sx={{ border: "none" }}>
                            <IconButton onClick={handleDownClick} color={color} disabled={disabled}>
                                <ArrowCircleDownOutlinedIcon fontSize="large" />
                            </IconButton>
                        </TableCell>
                        <TableCell padding="none" sx={{ border: "none" }} />
                    </TableRow>
                </TableBody>
            </Table>
        </Position >
    );
}

export default Main;
